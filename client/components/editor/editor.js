'use strict';

angular.module('loyoApp')
.directive('editor', function($parse, $modal) {
  return {
    restrict: 'E',
    template: function(tElement, tAttrs) {
      return '<span class="fa fa-cog" ng-click="$'+tAttrs.bind+'.click()"></span>';
    },
    link: function(scope, element, attrs) {
      $parse('$'+attrs.bind+'.click')
      .assign(scope, function() {
        var modalInstance = $modal.open({
          templateUrl: attrs.templateUrl,
          controller: 'editorModalCtrl',
          size: 'lg',
          resolve: {
            data: function () {
              return $parse(attrs.bind)(scope);
            },
            url: function() {
              return attrs.url;
            },
            title: function() {
              return attrs.title;
            }
          }
        });
        modalInstance.result.then(function (data) {
          $parse(attrs.bind).assign(scope, data);
        });
      });
    }
  };
})
.directive('summernote', function($window, $parse) {
  return {
    restrict: 'EAC',
    link: function(scope, element, attrs) {
      element.summernote({
        height: $window.innerHeight/3,
        force: true
      }).code($parse(attrs.bind)(scope).toString());
      scope.$on('$destroy', function() {
        element.destroy();
      });
    }
  };
})
.controller('editorModalCtrl', function($scope, $modalInstance, data, url, title) {
  $scope.title = title;
  $scope.data = angular.copy(data);
  $scope.save = function() {
  };
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
  if (title === '行程內容') {
  }
});
