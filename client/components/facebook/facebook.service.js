'use strict';
angular.module('FB.Utils', [])
.factory('FB', function($window, $q) {
  return {
    init: function(params) {
      $window.FB.init(_.merge({
        xfbml      : true,
        version    : 'v2.4'
      }, params));
    },
    api: function(path, method, params) {
      var defered = $q.defer();
      $window.FB.api(path, method, params, function(results) {
        defered.resolve(results);
      });
      return defered.promise;
    }
  }
})
.run(function(FB) {
  FB.init(_.merge({
    xfbml: true,
    version: 'v2.5',
    appId: '914232871945661'
  }));
})
.directive('fbPage', function(FB) {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      attrs.$set('dataWidth', element[0].offsetWidth);
      FB.init();
    }
  };
})
.directive('fbPost', function(FB) {
  return {
    restrict: 'C',
    require: '?ngMasonry',
    link: function(scope, element, attrs, ngMasonry) {
      FB.init();
//       if (ngMasonry)
    }
  };
})
.directive('fbItemWidth', function() {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
    }
  };
});
