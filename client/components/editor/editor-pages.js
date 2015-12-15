'use strict';

angular.module('loyoApp')
.directive('editorPage', function() {
  return {
    restict: 'A',
    template: '<a ui-sref="editorPage"><span class="fa fa-cog"></span></a>',
    link: function(scope, element, attrs) {
    }
  };
})
.controller('editorPageCtrl', function($scope, $http, $modal) {
  $http.get('/api/pages/navbar')
  .then(function(results) {
    $scope.pages = results.data;
  });
  $scope.addPage = function(index) {
    var modalInstance = $modal.open({
      template: '<div class="modal-header">' + 
        '<h3 class="modal-title">建立頁面</h3></div>' +
        '<div class="modal-body">' + 
        '<form role="form" name="createForm">' +
        '<div class="form-group">' +
        '<label>產品名稱</label>' +
        '<input name="pname" class="form-control" ng-model="pname" ' + 
        'placeholder="產品名稱" unique="pnames" required>' +
        '<p class="invalid-unique">**產品名稱 請勿重複</p>'+
        '<p class="invalid-required">**請輸入產品名稱</p>'+
        '</div></form></div>'+
        '<div class="modal-footer">' +
        '<button class="btn btn-primary" type="button" ng-click="save()">建立</button>' +
        '<button class="btn btn-warning" type="button" ng-click="cancel()">取消</button>' +
        '</div>',
      controller: 'addPageModalCtrl',
      size: 'md',
      resolve: {
        pnames: function() {
          return _.pluck($scope.pages, 'pname');
        }
      }
    });
    modalInstance.result.then(function(data) {
      $scope.pages.splice(0, 0, data);
      $scope.settingPage(0);
    });
  };
  $scope.settingPage = function(index) {
    var modalInstance = $modal.open({
      templateUrl: 'components/editor/page-editor-modal.html',
      controller: 'pageEditorModalCtrl',
      size: 'lg',
      backdrop: 'static',
      windowTemplateUrl: 'template/modal/window-fullwidth.html',
      resolve: {
        data: function ($http) {
          var pageid = $scope.pages[index]._id;
          return $http.get('/api/pages/context/'+pageid)
          .then(function(results) {
            return _.merge(results.data, {_id: pageid});
          });
        },
        pnames: function() {
          return _.pluck($scope.pages, 'pname');
        }
      }
    });
    modalInstance.result.then(function(data) {
      _.merge($scope.pages[index], data);
    });
  };
})
.controller('addPageModalCtrl', function($scope, $modalInstance, $http, pnames) {
  $scope.pnames = pnames;
  $scope.save = function() {
    $scope.createForm.$setDirty();
    if ($scope.createForm.$valid) {
      $http.post('/api/pages/context', {
        pname: $scope.pname
      })
      .then(function(results) {
        $modalInstance.close(results.data);
      });
    }
  };
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
})
.directive('unique', function($parse) {
  return {
    restict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$validators.unique = function(modelValue, viewValue) {
        return _.indexOf($parse(attrs.unique)(scope), modelValue) === -1;
      };
    }
  };
})
.controller('pageEditorModalCtrl', function($scope, $modalInstance, $http, PageUtils, data, pnames) {
  $scope.pnames = _.filter(pnames, function(pname) {
    return pname !== data.pname;
  });
  $scope.data = data;
  $scope.data.airplanes = PageUtils.transAirplaneRef($scope.data.airplanes);
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
  $scope.save = function() {
    if ($scope.data.createForm.$valid) {
      $http.post('/api/pages/context/' + data._id, {
        pname: $scope.data.pname,
        intro: $scope.data.intro,
        feature: $scope.data.feature,
        specialize: $scope.data.specialize,
        details: $scope.data.details,
        priority: $scope.data.priority,
        airplanes: PageUtils.invertAirplaneRef($scope.data.airplanes)
      })
      .then(function(results) {
        $modalInstance.close({
          pname: $scope.data.pname,
          priority: $scope.data.priority,
          ts: results.data.ts,
          category: $scope.data.intro.category,
          subcategory: $scope.data.intro.subcategory,
          title: $scope.data.intro.title
        });
      });
    }
  };
})
.directive('modalBody', function($controller) {
  return {
    restirct: 'E',
    controller: function($scope, $element, $attrs, $modal, $http, PageUtils) {
      var field = $attrs.bind.replace(/data\./, '');
      $controller('editorModalCtrl', {
        $scope: $scope, 
        $modal: $modal, 
        $modalInstance: {}, 
        $http: $http, 
        PageUtils: PageUtils,
        pageid: '', 
        data: $scope.data, 
        field: field, 
        title: ''
      });
    },
    scope: { data: '=bind' },
    templateUrl: function(tElement, tAttrs) {
      return tAttrs.templateUrl;
    },
    compile: function(tElement) {
      tElement.html(tElement.find('.modal-body'));
      return function postLink(scope, element, attrs) {
      };
    }
  };
});
