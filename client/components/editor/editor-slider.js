'use strict';

angular.module('loyoApp')
.directive('editorSlider', function($modal, $parse) {
  return {
    restrict: 'EAC',
    template: function(tElement, tAttrs) {
      if (tAttrs.editorSlider === 'navbar') {
        return '<a ui-sref="editorSlider"><span class="fa fa-slideshare"></span></a>';
      }
      return '<a href="" ng-click="open()"><span class="fa fa-slideshare"></span></a>';
    },
    scope: true,
    link: function(scope, element, attrs) {
      scope.open = function() {
        var modalInstance = $modal.open({
          templateUrl: 'components/editor/editor-slider-modal.html',
          controller: 'editorSliderModalCtrl',
          windowTemplateUrl: 'template/modal/window-fullwidth.html',
          resolve: {
            sliders: function($http) {
              return $http.get('/api/pages/slide')
              .then(function(results) {
                return results.data;
              });
            },
            pageSlide: function($http) {
              return $http.get('/api/pages/pageSlide/'+$parse(attrs.pageSlideId)(scope))
              .then(function(results) {
                return results.data;
              });
            }
          }
        });
        modalInstance.result.then(function(src) {
          element.scope().$eval(attrs.resolve);
        });
      };
    }
  };
})
.controller('editorSliderCtrl', function($scope, $http) {
  $scope.rsOptions = {
    delay: 9000,
    startwidth: 1360,
    startheight: 760,
    hideThumbs: 10,
//  fullScreen: 'on',
    hideAllCaptionAtLimit: 420,
//  hideTimerBar: 'on',
    navigationStyle: 'preview4'
  };
  $scope.tabs = [{active: true}];
  $scope.selectSlider = function(slider) {
    var index = _.indexOf($scope.editSliders, slider);
    if (index === -1) {
      $scope.editSliders.push(slider);
      index = $scope.editSliders.length-1;
    }
    $scope.tabs[index+1] = {active: true};
  };
  $scope.addSlider = function() {
    var slider = {
      transition: 'fade',
      slotamount: 5,
      masterspeed: 1000,
      class: 'revolution-mch-1',
      title: 'Empty Slide',
      elems: [{ 
        tag: 'img',
        src: '/assets/images/empty.jpg'
      }]
    };
    $scope.selectSlider(slider);
  };
  $scope.saveSlider = function(slider) {
    $http.post('/api/pages/slide', slider)
    .then(function(result) {
      slider._id = result.data;
    });
  };
  $scope.nav = ['active'];
  $scope.currentNav = 0;
  $scope.navClick = function(index) {
    $scope.nav = [];
    $scope.nav[index] = 'active';
    $scope.currentNav = index;
  };
  $scope.summernoteOptions = {
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
    ]
  };
  $scope.addText = function(eslider) {
    eslider.elems.push({
      tag: 'div',
      class: 'tp-caption revolution-ch1'
    });
  };
  $scope.removeText = function(eslider, index, rsApi, event) {
    eslider.elems = _.reduce(eslider.elems, function(elems, elem, idx) {
      if (idx!==index) elems.push(elem);
      return elems;
    }, []);
    rsApi.restart();
  };
//   $scope.closeTab = function(index) {
//     $scope.editSliders = _.reduce($scope.editSliders, function(editSliders, editSlider, idx) {
//       if (index!==idx) editSliders.push(editSlider);
//       return editSliders;
//     }, []);
//   };
  $scope.editSliders = [];
  $scope.getSlides = function() {
    $scope.sliders = [];
    $http.get('/api/pages/slide')
    .then(function(results) {
      $scope.sliders = results.data;
    });
  };
})
.controller('editorSliderModalCtrl', function($scope, $http, $window, $modalInstance, sliders, pageSlide) {
  $scope.rsOptions = pageSlide.options || {};
  console.log($scope.rsOptions);
  $scope.select = [];
  $scope.currentSliders = _.filter(sliders, function(slide, index) {
    var isFind = _.find(pageSlide.slides, {_id: slide._id});
    if (isFind) $scope.select[index] = true;
    return isFind;
  });
//   $scope.rsOptions = {
//     delay: 9000,
//     startwidth: 1360,
//     startheight: 760,
//     hideThumbs: 10,
// //     fullScreen: 'on',
//     hideAllCaptionAtLimit: 420,
//     navigationStyle:'preview4'
//   };
  $scope.tab = {index: 0};
  $scope.selectTab = function(index) {
    $scope.tab.index = index;
  };
  $scope.removeTab = function(index, event) {
    $scope.tab.index = index-1;
    $scope.editSliders = _.filter($scope.editSliders, function(eslide, i) {
      return index-1 !== i
    });
  };
  $scope.selectSlider = function(slider, select, rsApi) {
    if (select) {
      $scope.currentSliders.push(slider);
      rsApi.restart();
    } else {
      $scope.currentSliders = _.filter($scope.currentSliders, function(currentSlider) {
        return currentSlider !== slider;
      });
      rsApi.restart();
    }
  };
  $scope.allRsOptions = {
    startwidth: 1360,
    startheight: 760,
    hideThumbs: 10,
    hideTimerBar: 'on'
  };
  $scope.save = function() {
    $http.post('/api/pages/pageSlide/'+pageSlide._id, {
      options: $scope.rsOptions,
      slides: _.map($scope.currentSliders, function(slide) {
        return slide._id;
      })
    }).then(function(result) {
      $modalInstance.close(result.data);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
  $scope.sliders = sliders;
  $scope.height = {
    height: ($window.innerHeight-250)+'px',
    'overflow-y': 'auto'
  };
  // edit slide
  $scope.nav = ['active'];
  $scope.currentNav = 0;
  $scope.navClick = function(index) {
    $scope.nav = [];
    $scope.nav[index] = 'active';
    $scope.currentNav = index;
  };
  $scope.summernoteOptions = {
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
    ]
  };
  $scope.addText = function(eslider) {
    eslider.elems.push({
      tag: 'div',
      class: 'tp-caption revolution-ch1'
    });
  };
  $scope.removeText = function(eslider, index, rsApi, event) {
    eslider.elems = _.reduce(eslider.elems, function(elems, elem, idx) {
      if (idx!==index) elems.push(elem);
      return elems;
    }, []);
    rsApi.restart();
  };
  $scope.editSliders = [];
  $scope.editSlider = function(slider) {
    var index = _.indexOf($scope.editSliders, slider);
    if (index === -1) {
      $scope.editSliders.push(slider);
      index = $scope.editSliders.length-1;
    }
    $scope.tab.index = index+1;
  };
  $scope.addSlider = function() {
    var slider = {
      transition: 'fade',
      slotamount: 5,
      masterspeed: 1000,
      class: 'revolution-mch-1',
      title: 'Empty Slide',
      elems: [{ 
        tag: 'img',
        src: '/assets/images/empty.jpg'
      }]
    };
    $scope.editSlider(slider);
  };
  $scope.saveSlider = function(slider) {
    $http.post('/api/pages/slide', slider)
    .then(function(result) {
      slider._id = result.data;
    });
  };
})
.directive('rvPosition', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.rvPosition = function(modelVal, viewVal) {
        if (modelVal === undefined) return true;
        if (attrs.rvPosition === 'x') {
          return _.isNaN(+modelVal) ? /(left|right|center)/.test(modelVal) : +modelVal <= 2500 && modelVal >= -2500;
        }
        if (attrs.rvPosition === 'y') {
          return _.isNaN(+modelVal) ? /(top|bottom|center)/.test(modelVal) : +modelVal <= 2500 && modelVal >= -2500;
        }
        return true;
      };
    }
  };
});
