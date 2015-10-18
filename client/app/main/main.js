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
    })
    .state('出團資訊', {
      url: '/出團資訊?{start}&{end}&{key}&{page}',
      templateUrl: 'app/main/search-results.html',
      controller: 'searchResults',
      resolve: {
        search: function($http, $stateParams) {
          return $http.get('/api/airplane/projects', {
            params: $stateParams
          });
        }
      }
    });
});
