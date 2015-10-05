'use strict';

var debug;
angular.module('unify', [])
.directive('headerFixedShrink', function($window) {
  return {
    restirct: 'A',
    link: function(scope, element, attr) {
      angular.element($window).bind('scroll', function() {
        if ($window.scrollY) {
          element[0].classList.add('header-fixed-shrink');
        } else {
          element[0].classList.remove('header-fixed-shrink');
        }
      });
    }
  };
})
.directive('revolutionSlider', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.revolution( {
                delay: 9000,
                startwidth: 1170,
                startheight: 500,
                hideThumbs: 10,
                hideTimerBar: 'on',
                navigationStyle:'preview4'
            });
    }
  };
});
