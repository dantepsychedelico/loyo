'use strict';

angular.module('loyoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'unify',
  'ngFileUpload',
//   'FB.Utils',
  'ngAnimate',
  'agGrid'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
})
.run(function ($rootScope, $window) {
  $rootScope.$on('$locationChangeSuccess', function(e) {
    $window.scrollTo(0,0);
  });
});
