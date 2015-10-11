'use strict';

var ee;
angular.module('unify', [])
.directive('headerFixedShrink', function($window, $timeout) {
  return {
    restirct: 'A',
    link: function(scope, element, attr) {
      function fixedShrink() {
        if ($window.scrollY && attr.class.match(/header-fixed-shrink/)===null) {
          attr.$addClass('header-fixed-shrink');
        } else if ($window.scrollY === 0) {
          attr.$removeClass('header-fixed-shrink');
        }
        $timeout(fixedShrink, 100);
      }
//       $timeout(fixedShrink, 100);
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
      element.revolution(angular.extend({
          delay: 9000,
          startwidth: 1170,
          startheight: 700,
          hideThumbs: 10,
//           fullScreen: 'on',
//           hideTimerBar: 'on',
          navigationStyle:'preview4'
      }, $parse(attrs.revolutionSlider)(scope)));
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
