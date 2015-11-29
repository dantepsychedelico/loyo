'use strict';

angular.module('unify', [])
.factory('Modernizr', function($window) {
  return $window.Modernizr;
})
.directive('headerFixedShrink', function($window, $timeout, Modernizr) {
  return {
    restirct: 'A',
    link: function(scope, element, attr) {
      console.log(Modernizr);
      angular.element($window).bind('scroll', function() {
        if ($window.scrollY && attr.class.match(/header-fixed-shrink/)===null) {
          element.addClass('header-fixed-shrink');
        } else if ($window.scrollY === 0) {
          element.removeClass('header-fixed-shrink');
        }
      });
    }
  };
})
.directive('revolutionSlider', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var api = element.revolution(angular.extend({
          delay: 9000,
          startwidth: 1360,
          startheight: 760,
          hideThumbs: 10,
          fullScreen: 'on',
//           startWithSlide: 1,  // design slide
//           stopAtSlide: 1, // design slide
//           stopAfterLoops: 0,  // design slide
          hideAllCaptionAtLimit: 420,
//           hideTimerBar: 'on',
          navigationStyle:'preview4'
      }, $parse(attrs.revolutionSlider)(scope)));
      scope.$on('$destroy', function() {
        api.revpause();
      });
    }
  };
})
.directive('ngMasonry', function($parse) {
  return {
    restrict: 'A',
    controller: function($scope, $element, $attrs) {
      this.layout = function() {
        $element.masonry('layout');
      }
    },
    link: function(scope, element, attrs) {
      element.masonry(angular.merge({
        itemSelector: '.grid-item',
        columnWidth: 200
      }, $parse(attrs.ngMasonry)(scope)));
    }
  };
})
.directive('ngMasonryLoad', function() {
  return {
    require: '^ngMasonry',
    restrict: 'A',
    link: function(scope, element, attrs, ngMasonry) {
      element.bind('load', function() {
        ngMasonry.layout();
      });
    }
  };
})
.directive('leftSlideBar', function($window) {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      var footerHeight = angular.element(document.getElementById('footer')).height();
      angular.element($window).bind('scroll', function() {
        if (document.body.scrollTop <= 130) {
          element.css('margin-top', 220-document.body.scrollTop);
          element.css('max-height', $window.innerHeight - 110);
          element.css('display', 'block');
        } else if (document.body.clientHeight - $window.innerHeight - document.body.scrollTop < footerHeight) {
          var height = document.body.clientHeight - footerHeight - document.body.scrollTop - 110;
          if (height > 0) {
            element.css('max-height', height);
            element.css('margin-top', 90);
            element.css('display', 'block');
          } else {
            element.css('max-height', 0);
            element.css('margin-top', 90);
            element.css('display', 'none');
          }
        } else {
          element.css('max-height', $window.innerHeight - 110);
          element.css('margin-top', 90);
          element.css('display', 'block');
        }
      });
    }
  };
})
.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/carousel/carousel-no-chevron.html',
    '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" '+
    'ng-swipe-right="prev()" ng-swipe-left="next()">' +
    '<ol class="carousel-indicators" ng-show="slides.length > 1">' +
    '<li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">' +
    '<span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>'+
    '</li>' +
    '</ol>' +
    '<div class="carousel-inner" ng-transclude></div>' +
    '</div>');
}])
.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/carousel/carousel-no-indicators.html',
   '<div class="carousel-v1">' +
    '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" '+
    'ng-swipe-right="prev()" ng-swipe-left="next()">' +
    '<div class="carousel-inner" ng-transclude></div>' +
    '<div class="carousel-arrow">' +
    '<a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1">'+
    '<i class="fa fa-angle-left">' + 
    '</i>' + 
    '</a>' +
    '<a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1">'+
    '<i class="fa fa-angle-right">' + 
    '</i>' + 
    '</a>' +
    '</div>' +
    '</div>'+
    '</div>');
}]);
