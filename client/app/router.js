'use strict';

angular.module('loyoApp')
.config(function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })
    .state('editorPage', {
      url: '/產品頁面', 
      templateUrl: 'components/editor/editor-pages.html',
      controller: 'editorPageCtrl'
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
    .state('categories', {
      url: '/:category',
      controller: 'CategoryCtrl',
      templateUrl: '/app/pages/coming-soon.html'
    })
    .state('subcategories', {
      url: '/:category/:subcategory',
      controller: 'SubCategoryCtrl',
      templateUrl: '/app/pages/coming-soon.html'
    })
    .state('produnctions', {
      url: '/:category/:subcategory/:pname',
      templateUrl: '/app/pages/pages.html',
      controller: 'PageCtrl',
      resolve: {
        page: function(navBar, $stateParams) {
          return navBar.promise
            .then(function() {
              return {
                type: 'page',
                id: navBar.getId($stateParams.category, 
                                     $stateParams.subcategory, 
                                     $stateParams.pname)
              };
            });
        }
      }
    });
});

