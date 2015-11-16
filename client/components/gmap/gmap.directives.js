'use strict';

var ee;
angular.module('loyoApp')
.directive('gmapLoyo', ['GmapService', '$window', '$parse', '$q', '$compile', 
  function(GmapService, $window, $parse, $q, $compile) {
    return {
      restrict: 'A',
      template: function (tElement, tAttrs) {
        return '<div class="gmap-main" style="height: '+($window.innerHeight-110)+'px'+
          '; width: '+tElement.width()+'px "></div>' + 
          '<div class="input-group" gmap-search-box="'+ tAttrs.gmapLoyo + '">' + 
          '<input class="form-control" style="width: 300px" placeholder="Search Box" ng-model="searched">' +
          '</div>';
      },
      link: function(scope, element, attrs) {
        GmapService
        .then(function(google) {
          var map = new google.maps.Map(element.find('div.gmap-main:first')[0], {
            center: {lat: -43.53205440000001, lng: 172.63622540000006},
            zoom: 8
          });
          
          if ($parse(attrs.gmapLoyo).assign) {
            $parse(attrs.gmapLoyo).assign(scope, map);
          }
        });
      }
    };
  }
])
.directive('gmapSearchBox', ['$parse', 'GmapService', 
  function($parse, GmapService) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        GmapService
        .then(function(google) {
          var searchBox = new google.maps.places.SearchBox(element.find('input')[0]);
          var markers = [];
          searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();
            if (places.length == 0) return;
            console.log(places);

            // Clear out the old markers.
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

              // Create a marker for each place.
              markers.push(new google.maps.Marker({
                map: $parse(attrs.gmapSearchBox)(scope),
                icon: icon,
                title: place.name,
                position: place.geometry.location
              }));

              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            $parse(attrs.gmapSearchBox)(scope).fitBounds(bounds);
          });

        });
        var unregister = scope.$watch(attrs.gmapSearchBox, function(map) {
          if (map) {
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(element[0]);
            unregister();
          }
        });
      }
    }
  }
]);
