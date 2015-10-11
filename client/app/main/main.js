'use strict';

angular.module('loyoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('關於我們', {
        url: '/關於我們',
        templateUrl: 'app/main/about_loyo.html'
      });
  });
