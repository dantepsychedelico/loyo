'use strict';

var initMap;
angular.module('loyoApp')
.factory('GmapService', ['$q', function($q) {
  var deferred = $q.defer();
  var options = {
    v: '3.22',
    key: 'AIzaSyA-PIPKvaLE_lQHqZKj27L6Mb5_h5Pw48A',
    libraries: 'weather,geometry,visualization,places',
    callback: 'initMap',
    language: 'zh_TW',
    signed_in: true
  };
  initMap = function() {
    deferred.resolve(window.google);
  };
  var scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript'; 
  scriptTag.async = true;
  scriptTag.defer = true;
  scriptTag.src = 'https://maps.googleapis.com/maps/api/js?' + 
    Object.keys(options).map(function(key) {
      return key + '=' + options[key];
    }).join('&');

  var s = document.getElementsByTagName('body')[0];
  s.appendChild(scriptTag);
  return deferred.promise;
}]);
