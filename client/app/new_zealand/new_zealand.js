'use strict';

angular.module('loyoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('紐西蘭南島深度遊12天', {
        url: '/紐西蘭/南島深度遊12天',
        templateUrl: 'app/new_zealand/new_zealand_page1.html',
        controller: 'newZealandPage1'
      })
  });

