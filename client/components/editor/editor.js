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
            field: function() {
              return attrs.bind;
            },
            pageid: function() {
              return $parse(attrs.pageid)(scope);
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
.directive('summernote', function($window, $parse, $sce) {
  return {
    restrict: 'EAC',
    link: function(scope, element, attrs) {
      element.summernote({
        height: +attrs.height || $window.innerHeight/3,
        force: true,
        onChange: function(contents) {
          $parse(attrs.bind).assign(scope, $sce.trustAsHtml(contents));
        },
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['custom', ['kai', 'ming']],
          ['fontname', ['fontname']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['table', ['table']],
          ['insert', ['link', 'album', 'hr']],
          ['view', ['fullscreen', 'codeview']],
          ['help', ['help']]
        ]
      }).code(($parse(attrs.bind)(scope)||'').toString()); // bug cannot update
      scope.$on('$destroy', function() {
        element.destroy();
      });
    }
  };
})
.run(function($modal) {
  var template = angular.element.summernote.renderer.getTemplate();

  // add hello plugin 
  angular.element.summernote.addPlugin({
    name: 'custom',

    init : function(layoutInfo) { // run init method when summernote was initialized
//       var $note = layoutInfo.holder();
// 
//       // you can use jquery custom event.
//       $note.on('summernote.update', function(customEvent, nativeEvent) {
//          var $boldButton = angular.element(this).summernote('toolbar.get', 'bold');
//          $boldButton.toggleClass('active').css({
//            color : 'red'
//          });
//       });
    },
            
    buttons: {
      kai: function () {
        return template.iconButton('fa fa-kai', {
          event : 'kai',
          title: '標楷體',
          hide: true
        });
      },
      ming: function() {
        return template.iconButton('fa fa-ming', {
          event : 'ming',
          title: '微軟正黑體',
          hide: true
        });
      },
      album: function() {
        return template.iconButton('fa fa-picture-o', {
          event: 'album',
          title: '相簿',
          hide: true
        });
      }
    },

    events: { // events
      // run callback when hello button is clicked
      kai: function (event, editor, layoutInfo, value) {
        var $editable = layoutInfo.editable();
        editor.beforeCommand($editable);
        editor.fontName($editable, '標楷體, cwTeXKai, serif');
        editor.afterCommand($editable, true);
      },
      ming: function (event, editor, layoutInfo) {
        var $editable = layoutInfo.editable();
        editor.beforeCommand($editable);
        editor.fontName($editable, '微軟正黑體, Microsoft YaHei, 微软雅黑, メイリオ, 맑은 고딕, Helvetica Neue, Helvetica, Arial, cwTeXMing, serif');
        editor.afterCommand($editable, true);
      },
      album: function(event, editor, layoutInfo) {
        var modalInstance = $modal.open({
          templateUrl: 'components/editor/upload-image-modal.html',
          controller: 'imageUploadModalCtrl',
          windowTemplateUrl: 'template/modal/window-fullwidth.html'
        });
      }
    }
  });
})
.controller('editorModalCtrl', function($scope, $modal, $modalInstance, $http, pageid, data, field, title) {
  $scope.title = title;
  $scope.data = angular.copy(data);
  if (field === 'details') {
    _.set($scope.data, [0, 'active'], true);
    $scope.addDetail = function() {
      $scope.data.push({});
      _.last($scope.data).active = true;
    };
    $scope.removeDetail = function(index) {
      $modal.open({
        templateUrl: 'template/modal/confirm.html',
        controller: 'removeDetailConfirmModalCtrl',
        size: 'sm',
        resolve: {
          command: function() {
            return '第 '+(index+1)+' 天';
          },
          title: function() {
            return '確定刪除此頁';
          }
        }
      }).result
      .then(function() {
        _.remove($scope.data, $scope.data[index]);
      });
    };
    $scope.moveRight = function(index, event) {
      event.stopPropagation()
      var current = $scope.data[index];
      $scope.data[index] = $scope.data[index+1];
      $scope.data[index+1] = current;
    };
    $scope.moveLeft = function(index, event) {
      event.stopPropagation()
      var current = $scope.data[index];
      $scope.data[index] = $scope.data[index-1];
      $scope.data[index-1] = current;
    };
  }
  $scope.save = function() {
    var oo = {};
    if (_.has($scope, ['data', '$$unwrapTrustedValue'])) {
      oo[field] = $scope.data.$$unwrapTrustedValue();
    } else if (angular.isArray($scope.data)) {
      oo[field] = _.map($scope.data, function(data) {
        return {
          breakfast: data.breakfast,
          context: data.context.$$unwrapTrustedValue(),
          dinner: data.dinner,
          hotel: data.hotel,
          lunch: data.lunch,
          title: data.title,
          slides: data.slides
        };
      });
    }else {
      oo[field] = $scope.data;
    }
    $http.post('/api/pages/context/'+pageid+'/'+field, oo)
    .then(function(results) {
      $modalInstance.close($scope.data);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
})
.controller('removeDetailConfirmModalCtrl', function($scope, $modalInstance, command, title) {
  $scope.command = command;
  $scope.title = title;
  $scope.ok = function() {
    $modalInstance.close();
  };
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
})
.controller('imageUploadModalCtrl', function($scope, $modalInstance, $http, Upload) {
  function getAlbums() {
    $http.get('/api/pages/albums')
    .then(function(results) {
      $scope.albums = results.data;
    });
  }
  getAlbums();
  $scope.ocOptions = {
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    items : 4,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3]
  };
  $scope.showAlbumPhotos = function(album) {
    $scope.currentAlbum = album;
    $http.get('/api/pages/albums/'+album)
    .then(function(result) {
      $scope.photos = result.data;
    });
  };
  $scope.leave = function() {
    $modalInstance.dismiss();
  };
  $scope.remove = function() {
    $scope.picFiles = null;
  };
  $scope.$watch('picFiles', function(files) {
    _.forEach(files, function(file) {
      file.filename = file.name;
    });
  });
  $scope.uploadPic = function() {
    var completed = 0;
    _.forEach($scope.picFiles, function(pickFile) {
      pickFile.upload = Upload.upload({
        url: '/api/pages/image/'+$scope.album+'/'+pickFile.filename,
        data: {file: pickFile},
      });

      pickFile.upload
      .then(function (res) {
        completed +=1;
        if (completed === $scope.picFiles.length) {
          $scope.picFiles = null;
          getAlbums();
          if ($scope.album === $scope.currentAlbum) $scope.showAlbumPhotos($scope.currentAlbum);
        }
      }, function (response) {
        if (response.status > 0) {
          $scope.errorMsg = response.status + ': ' + response.data;
        }
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        pickFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    });
  };
})
.directive('naturalWidth', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.$observe('src', function() {
        element.load(function() {
          scope.$apply(function() {
            $parse(attrs.naturalWidth).assign(scope, element[0].naturalWidth);
          });
        });
      });
    }
  };
})
.directive('naturalHeight', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.$observe('src', function() {
        element.load(function() {
          scope.$apply(function() {
            $parse(attrs.naturalHeight).assign(scope, element[0].naturalHeight);
          });
        });
      });
    }
  };
})
.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/modal/window-fullwidth.html',
    '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"' +
    '    modal-animation-class="fade" modal-in-class="in"' +
    '	ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">' +
    '    <div class="modal-dialog" style="width: 97%;"><div class="modal-content" modal-transclude></div></div>' +
    '</div>');
}])
.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/modal/confirm.html',
    '<div class="modal-header">'+
    '<h3 class="modal-title" ng-bind="title"></h3>'+
    '</div>'+
    '<div class="modal-body" ng-bind="command">'+
    '</div>'+
    '<div class="modal-footer">'+
    '<button class="btn btn-primary" type="button" ng-click="ok()">確定</button>'+
    '<button class="btn btn-warning" type="button" ng-click="cancel()">取消</button>'+
    '</div>');
}]);
