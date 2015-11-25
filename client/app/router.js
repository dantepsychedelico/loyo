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
    })
    .state('紐西蘭南島深度遊12天', {
      url: '/紐西蘭/南島深度遊12天',
      templateUrl: 'app/NewZealand/NewZealand_page1.html',
      controller: 'NewZealandPage1',
      resolve: {
        search: function($http) {
          return $http.get('/api/airplane/projects', {
            params: {
              start: new Date(),
              key: '【OFF慢遊】紐西蘭南島深度遊12天庫克山面山房,觀星,峽灣景觀飛機'
            }
          });
        }
      }
    });
});
