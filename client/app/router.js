'use strict';

angular.module('loyoApp')
.config(['$stateProvider', function ($stateProvider) {
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
    .state('editorSlider', {
      url: '/editor-slider', 
      templateUrl: 'components/editor/editor-slider.html',
      controller: 'editorSliderCtrl'
    })
    .state('about', {
      url: '/關於我們',
      templateUrl: 'app/main/about_loyo.html'
    })
    .state('groupInfo', {
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
      url: '/樂遊行程/:category',
      controller: 'CategoryCtrl',
      templateUrl: '/app/pages/coming-soon.html'
    })
    .state('subcategories', {
      url: '/樂遊行程/:category/:subcategory',
      controller: 'SubCategoryCtrl',
      templateUrl: '/app/pages/coming-soon.html'
    })
    .state('produnctions', {
      url: '/樂遊行程/:category/:subcategory/:pname',
      templateUrl: '/app/pages/pages.html',
      controller: 'PageCtrl',
      resolve: {
        page: ['navBar', '$stateParams', function(navBar, $stateParams) {
          return navBar.promise
            .then(function() {
              return {
                type: 'page',
                id: navBar.getId($stateParams.category, 
                                     $stateParams.subcategory, 
                                     $stateParams.pname)
              };
            });
        }]
      }
    })
    .state('account', {
        url: '/account',
        abstract: true,
        template: '<div ui-view></div>'
    })
    .state('account.signin', {
        url: '/signin',
        templateUrl: '/app/auth/signin.html'
    })
    .state('account.signup', {
        url: '/signup',
        templateUrl: '/app/auth/signup.html'
    });
}]);
