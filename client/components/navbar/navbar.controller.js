'use strict';

angular.module('loyoApp')
.controller('navbarCtrl', function ($scope, $location) {
  $scope.menu = [{
    'title': 'Home',
    'link': '/'
  }];

  $scope.isCollapsed = true;

  $scope.isActive = function(route) {
    return route === $location.path();
  };
  // init navbar search class
  $scope.navbarSearchClass = {
    'fa-search': true,
    'fa-times': false
  }
  $scope.navbarSearch = function() {
    $scope.navbarSearchClass = {
      'fa-search': !$scope.navbarSearchClass['fa-search'],
      'fa-times': !$scope.navbarSearchClass['fa-times']
    }
  };
});
