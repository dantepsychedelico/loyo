'use strict';

angular.module('loyoApp')
.controller('navbarCtrl', function ($scope, $location, $state, navBar) {
  $scope.menu = [{
    'title': 'Home',
    'link': '/'
  }];
  $scope.categories = [];
  navBar.promise
  .then(function() {
    _.forEach(_.sortBy(navBar.getData(), function(d) {
      return angular.isUndefined(d.priority) ? 0 : d.priority;
    }).reverse(), function(data) {
      var category = data.category;
      var subcategory = data.subcategory;
      var pname = data.pname;
      var isExist = _.find($scope.categories, {href: category});
      var obj = {};
      if (isExist) {
        if (subcategory) {
          var isSubExist = _.find(isExist.subcategories, {href: subcategory});
          if (isSubExist) {
            isSubExist.pnames.push({href: pname});
          } else {
            if (isExist.subcategories) {
              isExist.subcategories.push({href: subcategory, pnames: [{href: pname}]});
            } else {
              isExist.subcategories = [{href: subcategory, pnames: [{href: pname}]}];
            }
          }
        } else {
          if (isExist.pnames) {
            isExist.pnames.push({href: pname});
          } else {
            isExist.pnames = [{href: pname}];
          }
        }
      } else {
        obj.href = category;
        if (subcategory) {
          obj.subcategories = [{href: subcategory, pnames: [ { href: pname } ]}]
        } else {
          obj.pnames = [{href: pname}]
        }
        $scope.categories.push(obj);
      }
    });
  });

  $scope.isCollapsed = true;

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
    minDate: moment(),
    maxDate: moment().add(1, 'year')
  };
  $scope.endDateOptions = {
    minDate: moment(),
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
})
.factory('navBar', function($http, $q) {
  var deferred = $q.defer();
  var data;
  $http.get('/api/pages/navbar')
  .then(function(results) {
    data = results.data;
    deferred.resolve();
  });
  return {
    promise: deferred.promise,
    getData: function() {
      return data;
    },
    getId: function(category, subcategory, pname) {
      return _.get(_.find(data, {
        category: category, 
        subcategory: subcategory, 
        pname: pname}), '_id');
    }
  };
});
