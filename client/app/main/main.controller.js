'use strict';

angular.module('loyoApp')
.controller('MainCtrl', function ($scope, $http, $window) {
  $scope.window = {
    width: $window.innerWidth,
    height: $window.innerHeight
  };
});
