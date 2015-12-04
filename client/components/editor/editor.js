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
          backdrop: 'static',
          windowTemplateUrl: attrs.windowTemplateUrl || 'template/modal/window.html',
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
.directive('imageUpload', function($modal) {
  return {
    restrict: 'EAC',
    template: '<button class="btn-u btn-u-aqua" type="button" ng-click="open()">'+
      '<i class="fa fa-cloud-upload"></i> Upload Image</button>',
    scope: true,
    link: function(scope, element, attrs) {
      scope.open = function() {
        var modalInstance = $modal.open({
          templateUrl: 'components/editor/upload-image-modal.html',
          controller: 'imageUploadModalCtrl',
          windowTemplateUrl: 'template/modal/window-fullwidth.html'
        });
      };
    }
  };
})
.directive('summernote', function($window, $parse) {
  return {
    restrict: 'EAC',
    link: function(scope, element, attrs) {
      element.summernote({
        height: +attrs.height || $window.innerHeight/3,
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
    angular.noop()
  }
})
.controller('imageUploadModalCtrl', function($scope, $modalInstance, $timeout, Upload) {
  $scope.leave = function() {
    $modalInstance.dismiss();
  };
  $scope.remove = function() {
    $scope.picFile = null;
    $scope.filename = null;
  };
  $scope.$watch('picFile', function(newVal) {
    $scope.filename = _.get(newVal, 'name');
  });
  $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: '/api/upload/image/'+$scope.album+'/'+$scope.filename,
      data: {file: file},
    });

    file.upload
    .then(function (res) {
      $timeout(function() {
        $scope.picFile = null;
        $scope.filename = null;
      }, 5000);
    }, function (response) {
      if (response.status > 0) {
        $scope.errorMsg = response.status + ': ' + response.data;
      }
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  };
})
.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/modal/window-fullwidth.html',
    '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"' +
    '    modal-animation-class="fade" modal-in-class="in"' +
    '	ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">' +
    '    <div class="modal-dialog" style="width: 97%;"><div class="modal-content" modal-transclude></div></div>' +
    '</div>');
}]);
