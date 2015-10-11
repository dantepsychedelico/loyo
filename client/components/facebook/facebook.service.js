'use strict';

angular.module('FB.Utils', [])
.factory('FB', function($window) {
  return {
    init: function(params) {
      $window.FB.init(_.merge({
        xfbml      : true,
        version    : 'v2.4'
      }, params));
    }
  }
})
.directive('fbPage', function(FB) {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      attrs.$set('dataWidth', element[0].offsetWidth);
      FB.init();
    }
  };
});
