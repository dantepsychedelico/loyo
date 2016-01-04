'use strict';

angular.module('loyoApp')
.directive('editorSlider', function($modal) {
  return {
    restrict: 'EAC',
    template: function(tElement, tAttrs) {
      if (tAttrs.editorSlider === 'navbar') {
        return '<a ui-sref="editorSlider"><span class="fa fa-slideshare"></span></a>'
      }
      return '<a href="" ng-click="open()"><span class="fa fa-slideshare"></span></a>'
    },
    scope: true,
    link: function(scope, element, attrs) {
      scope.open = function() {
        var modalInstance = $modal.open({
          templateUrl: 'components/editor/editor-slider-modal.html',
          controller: 'editorSliderModalCtrl',
          windowTemplateUrl: 'template/modal/window-fullwidth.html',
//           resolve: {
//             insert: function() {
//               return attrs.insert;
//             }
//           }
        });
//         modalInstance.result.then(function(src) {
//           $parse(attrs.insert).assign(scope, src);
//         });
      };
    }
  };
})
.controller('editorSliderCtrl', function($scope) {
  $scope.rsOptions = {
    delay: 9000,
    startwidth: 1360,
    startheight: 760,
    hideThumbs: 10,
//     fullScreen: 'on',
    hideAllCaptionAtLimit: 420,
//  hideTimerBar: 'on',
    navigationStyle: 'preview4'
  };
  $scope.tabs = [{active: true}, {active: false}, {active: false}, {active: false}];
  $scope.selectSlider = function(slider) {
    var index = _.indexOf($scope.editSliders, slider);
    if (index === -1) {
      $scope.editSliders.push(slider);
      index = $scope.editSliders.length-1;
    }
    $scope.tabs[index+1].active = true;
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
  $scope.addText = function() {
    $scope.eslider.elems.push({
      tag: 'div',
      class: 'tp-caption revolution-ch1'
    });
  };
  $scope.editSliders = [];
  $scope.sliders = [{
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    class: 'revolution-mch-1',
    title: 'OFF 漫遊純淨紐西蘭',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide1_720x270.jpg',
      bgfit: 'cover',
      bgposition: 'center center',
      bgrepeat: 'no-repeat'
    }, {
      tag: 'div',
      class: 'tp-caption revolution-ch1 font-ming',
      _iac: 'sft',
      x: 'center',
      hoffset: 0,
      y: 'top',
      voffset: 135,
      speed: 1500,
      start: 500,
      easing: 'Power3.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<p class="color-light"> OFF 漫遊純淨紐西蘭 </p>'
    }, {
      tag: 'div',
      class: 'tp-caption slide-font-32 font-ming',
      _iac: 'sft',
      x: 'right',
      hoffset: 0,
      y: 'center',
      speed: 1600,
      start: 1800,
      easing: 'Power4.easeOut',
      endspeed: 300,
      endeasing: 'Power1.easeIn',
      captionhidden: 'off',
      html: '<div class="color-light" style="border-color: white; border: solid 1px; padding: 5px;"> 蜜月佳偶及現場報名<br> 即可獲得神祕小禮！ </div>'
    }, {
      tag: 'div',
      class: 'tp-caption lfl revolution-ch1 font-ming',
      x: 0,
      hoffset: 0,
      y: 'center',
      voffset: -50,
      speed: 1600,
      start: 2300,
      easing: 'Power4.easeOut',
      endspeed: 100,
      endeasing: 'Power1.easeIn',
      captionhidden: 'off',
      html: '<div style="border-color: white; border-top: solid 1px; border-bottom: solid 3px; padding: 5px;"> <p class="color-light"> 2015-2016年 </p> <strong class="color-light" style="font-size: 80%;"> 【OFF慢遊】系列 紐西蘭行程發表會 </strong> </div>'
    }, {
      tag: 'div',
      class: 'tp-caption lfb revolution-ch1 font-ming',
      x: 0,
      hoffset: 0,
      y: 'center',
      voffset: 150,
      speed: 1600,
      start: 2800,
      easing: 'Power4.easeOut',
      endspeed: 100,
      endeasing: 'Power1.easeIn',
      captionhidden: 'off',
      html: '<div style="border-color: white; border-top: solid 3px; border-bottom: solid 1px; padding: 5px;"> <p class="color-light"> 時間：2015/10/17 下午2:00PM </p> <p class="color-light"> 地點：樂遊旅行社2樓 會議室 </p> </div>'
    }]
  }, {
    class: 'revolution-mch-1',
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    title: '戶外活動深度紐西蘭',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide2_1280x547.jpg',
      bgfit: 'cover',
      bgposition: 'center top',
      bgrepeat: 'no-repeat'
    }, {
      tag: 'div',
      class: 'tp-caption lft slide-font-50',
      x: 'center',
      hoffset: 0,
      y: 'top',
      voffset: 135,
      speed: 2000,
      start: 500,
      easing: 'Power4.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<p class="color-light"> 戶外活動深度紐西蘭 </p>'
    }, {
      tag: 'div',
      class: 'tp-caption revolution-ch1 lfr font-ming',
      x: 'right',
      hoffset: 0,
      y: 'bottom',
      voffset: 40,
      speed: 2000,
      start: 1000,
      easing: 'Power1.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<div class="tag-box tag-box-v2" style="background-color: rgba(250,250,250,0.45)"> <p class="color-black"> 2015-2016 年 </p> <p style="color: #b63629; font-size: 120%; padding-bottom: 20px;"> 戶外活動系列紐西蘭行程發表會 </p> <p class="color-black"> 時間: 2015/10/7 下午 2:00 PM </p> <p class="color-black"> 地點: 樂遊旅行社2樓 會議室 </p> </div>'
    }]
  }, {
    class: 'revolution-mch-1',
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    title: 'Slide 3',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide3.png',
      bgfit: 'cover',
      bgposition: 'center top',
      bgrepeat: 'no-repeat'
    }]
  }, {
    class: 'revolution-mch-1',
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    title: 'Slide 4',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide4.png',
      bgfit: 'cover',
      bgposition: 'center top',
      bgrepeat: 'no-repeat'
    }]
  }, {
    class: 'revolution-mch-1',
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    title: 'Slide 5',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide5.png',
      bgfit: 'cover',
      bgposition: 'center top',
      bgrepeat: 'no-repeat'
    }]
  }];
//   $scope.eslider = $scope.sliders[0]
//   $scope.remove = function(slider, event) {
//     _.remove($scope.editSliders, function(editSlider) {
//       return slider === editSlider;
//     });
//   };
})
.controller('editorSliderModalCtrl', function($scope, $modalInstance) {
  $scope.rsOptions = {
    delay: 9000,
    startwidth: 1360,
    startheight: 760,
    hideThumbs: 10,
//     fullScreen: 'on',
    hideAllCaptionAtLimit: 420,
//  hideTimerBar: 'on',
    navigationStyle:'preview4'
  };
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
  $scope.sliders = [{
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    class: 'revolution-mch-1',
    title: 'Slide 1',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide1_720x270.jpg',
      bgfit: 'cover',
      bgposition: 'center center',
      bgrepeat: 'no-repeat'
    }, {
      tag: 'div',
      class: 'tp-caption revolution-ch1 sft font-ming',
      x: 'center',
      hoffset: 0,
      y: 'top',
      voffset: 135,
      speed: 1500,
      start: 500,
      easing: 'Power3.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<p class="color-light"> OFF 漫遊純淨紐西蘭 </p>'
    }, {
      tag: 'div',
      class: 'tp-caption sft slide-font-32 font-ming',
      x: 'right',
      hoffset: 0,
      y: 'center',
      speed: 1600,
      start: 1800,
      easing: 'Power4.easeOut',
      endspeed: 300,
      endeasing: 'Power1.easeIn',
      captionhidden: 'off',
      html: '<div class="color-light" style="border-color: white; border: solid 1px; padding: 5px;"> 蜜月佳偶及現場報名<br> 即可獲得神祕小禮！ </div>'
    }, {
      tag: 'div',
      class: 'tp-caption lfl revolution-ch1 font-ming',
      x: 0,
      hoffset: 0,
      y: 'center',
      voffset: -50,
      speed: 1600,
      start: 2300,
      easing: 'Power4.easeOut',
      endspeed: 100,
      endeasing: 'Power1.easeIn',
      captionhidden: 'off',
      html: '<div style="border-color: white; border-top: solid 1px; border-bottom: solid 3px; padding: 5px;"> <p class="color-light"> 2015-2016年 </p> <strong class="color-light" style="font-size: 80%;"> 【OFF慢遊】系列 紐西蘭行程發表會 </strong> </div>'
    }, {
      tag: 'div',
      class: 'tp-caption lfb revolution-ch1 font-ming',
      x: 0,
      hoffset: 0,
      y: 'center',
      voffset: 150,
      speed: 1600,
      start: 2800,
      easing: 'Power4.easeOut',
      endspeed: 100,
      endeasing: 'Power1.easeIn',
      captionhidden: 'off',
      html: '<div style="border-color: white; border-top: solid 3px; border-bottom: solid 1px; padding: 5px;"> <p class="color-light"> 時間：2015/10/17 下午2:00PM </p> <p class="color-light"> 地點：樂遊旅行社2樓 會議室 </p> </div>'
    }]
  }, {
    class: 'revolution-mch-1',
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    title: 'Slide 2',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide2_1280x547.jpg',
      bgfit: 'cover',
      bgposition: 'center top',
      bgrepeat: 'no-repeat'
    }, {
      tag: 'div',
      class: 'tp-caption lft slide-font-50',
      x: 'center',
      hoffset: 0,
      y: 'top',
      voffset: 135,
      speed: 2000,
      start: 500,
      easing: 'Power4.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<p class="color-light"> 戶外活動深度紐西蘭 </p>'
    }, {
      tag: 'div',
      class: 'tp-caption revolution-ch1 lfr font-ming',
      x: 'right',
      hoffset: 0,
      y: 'bottom',
      voffset: 40,
      speed: 2000,
      start: 1000,
      easing: 'Power1.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<div class="tag-box tag-box-v2" style="background-color: rgba(250,250,250,0.45)"> <p class="color-black"> 2015-2016 年 </p> <p style="color: #b63629; font-size: 120%; padding-bottom: 20px;"> 戶外活動系列紐西蘭行程發表會 </p> <p class="color-black"> 時間: 2015/10/7 下午 2:00 PM </p> <p class="color-black"> 地點: 樂遊旅行社2樓 會議室 </p> </div>'
    }]
  }, {
    class: 'revolution-mch-1',
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    title: 'Slide 3',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide3.png',
      bgfit: 'cover',
      bgposition: 'center top',
      bgrepeat: 'no-repeat'
    }]
  }, {
    class: 'revolution-mch-1',
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    title: 'Slide 4',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide4.png',
      bgfit: 'cover',
      bgposition: 'center top',
      bgrepeat: 'no-repeat'
    }]
  }, {
    class: 'revolution-mch-1',
    transition: 'fade',
    slotamount: 5,
    masterspeed: 1000,
    title: 'Slide 5',
    elems: [{
      tag: 'img',
      src: '/api/images/slide/slide5.png',
      bgfit: 'cover',
      bgposition: 'center top',
      bgrepeat: 'no-repeat'
    }]
  }];
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
