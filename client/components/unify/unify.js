'use strict';

var api;
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
          attr.$addClass('header-fixed-shrink');
          scope.$apply();
        } else if ($window.scrollY === 0) {
          attr.$removeClass('header-fixed-shrink');
          scope.$apply();
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
}]);
