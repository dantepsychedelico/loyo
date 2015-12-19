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
          controller: attrs.controller || 'editorModalCtrl',
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
.factory('PageUtils', function() {
  function transAirplaneRef(airplaneRef) {
    var results = [];
    _.forEach(airplaneRef, function(ref, i) {
      _.forEach(ref.through, function(path, j) {
        if (!j) {
          path.index = i;
          path.itemNum = ref.through.length;
        }
        results.push(path);
      });
    });
    return results;
  }
  function invertAirplaneRef(airplanes) {
    var rr = [];
    var jj;
    _.forEach(airplanes, function(data) {
      if (data.itemNum) {
        jj = {through: [{
          day: data.day,
          from: data.from,
          to: data.to,
          time: data.time,
          airplane: data.airplane,
          flightNo: data.flightNo
        }]};
        rr.push(jj);
      }else {
        jj.through.push({
          day: data.day,
          from: data.from,
          to: data.to,
          time: data.time,
          airplane: data.airplane,
          flightNo: data.flightNo
        });
      }
    });
    return rr;
  }
  return {
    transAirplaneRef: transAirplaneRef,
    invertAirplaneRef: invertAirplaneRef
  };
})
.directive('imageUpload', function($modal, $parse) {
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
          windowTemplateUrl: 'template/modal/window-fullwidth.html',
          resolve: {
            insert: function() {
              return attrs.insert;
            }
          }
        });
        modalInstance.result.then(function(src) {
          $parse(attrs.insert).assign(scope, src);
        });
      };
    }
  };
})
.controller('editorModalCtrl', function($scope, $modal, $modalInstance, $http, PageUtils, pageid, data, field, title) {
  $scope.title = title;
  $scope.data = angular.copy(data);
  $scope.field = field;
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
    $scope.addSlide = function(index, detail) {
      detail.slides = detail.slides || [];
      detail.slides.splice(index+1, 0, {});
    };
    $scope.deleteSlide = function(slide, detail) {
      _.remove(detail.slides, function(ss) {
        return ss === slide;
      });
    };
  }

  if (field === 'airplanes') {
    $scope.addRow = function(index) {
      $scope.data.splice(index+1, 0, {});
      for (; index>=0; index--) {
        if ($scope.data[index].itemNum) {
          $scope.data[index].itemNum += 1;
          return;
        }
      }
    };
    $scope.deleteRow = function(index) {
      if ($scope.data[index].itemNum) {
        if ($scope.data[index+1]) {
          $scope.data[index+1].itemNum = $scope.data[index].itemNum-1;
          $scope.data[index+1].index = $scope.data[index].index;
        }
        _.remove($scope.data, function(data) {
          return data === $scope.data[index];
        });
      } else {
        _.remove($scope.data, function(data) {
          return data === $scope.data[index]
        });
        for (; index>=0; index--) {
          if (_.get($scope.data, [index, 'itemNum'])) {
            $scope.data[index].itemNum -= 1;
            return;
          }
        }
      }
    };
    $scope.addThrough = function() {
      for (var j=$scope.data.length-1; j>=0; j--) {
        if ($scope.data[j].itemNum) {
          $scope.data.push({
            index: $scope.data[j].index+1,
            itemNum: 1
          });
          return;
        }
      }
      $scope.data.push({index: 0, itemNum:1});
    };
  }

  $scope.save = function() {
    var oo = {};
    if (_.has($scope, ['data', '$$unwrapTrustedValue'])) {
      oo[field] = $scope.data.$$unwrapTrustedValue();
    } else if (field === 'details') {
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
    } else if (field==='airplanes') {
      oo.airplanes = PageUtils.invertAirplaneRef($scope.data);
    } else {
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
.controller('editorProductionsModalCtrl', function($scope, $modalInstance, $http, pageid, data, field, title) {
  $scope.data = angular.copy(data);
  $scope.field = field;
  $scope.save = function() {
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
.controller('imageUploadModalCtrl', function($scope, $modalInstance, $http, Upload, insert) {
  $scope.insert = insert;
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
  $scope.insertImage = function(src) {
    $modalInstance.close('/api/images/'+src);
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
