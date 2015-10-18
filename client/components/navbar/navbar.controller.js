'use strict';

angular.module('loyoApp')
.controller('navbarCtrl', function ($scope, $location, $state) {
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
  $scope.data = {
    start: moment(),
    end: moment().add(6, 'month')
  };
  $scope.startDateOptions = {
    minDate: moment().add(-1, 'minute'),
    maxDate: moment().add(1, 'year')
  };
  $scope.endDateOptions = {
    minDate: moment().add(-1, 'minute'),
    maxDate: moment().add(1, 'year')
  };
  $scope.dataFormator = function(date) {
    return (angular.isString(date) ? 
            moment(date, 'YYYY-MM-DD a hh:mm') : 
            date).format('YYYY-MM-DD/HH:mm');
  };
  $scope.search = function() {
    $state.go('出團資訊', {
      start: $scope.dataFormator($scope.data.start),
      end: $scope.dataFormator($scope.data.end),
      key: $scope.data.key,
      page: 0
    })
  };
});
