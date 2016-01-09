'use strict';

angular.module('loyoApp')
.controller('MainCtrl', function ($scope, $http, $window, $sce) {
//   $scope.window = {
//     width: $window.innerWidth,
//     height: $window.innerHeight
//   };
  $scope.masonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 10
  };

  $scope.rsOptions = {
    delay: 9000,
    startwidth: 1360,
    startheight: 760,
    hideThumbs: 10,
    fullScreen: 'on',
    hideAllCaptionAtLimit: 420,
    timerBarPosition: 'bottom',
//  hideTimerBar: 'on',
    navigationStyle:'preview4'
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
      class: 'tp-caption sft',
      x: 'center',
      hoffset: 0,
      y: 'top',
      voffset: 135,
      speed: 1500,
      start: 500,
      easing: 'Power3.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<div class="revolution-ch1"><p class="slide-font-50 color-light font-kai"> OFF 漫遊純淨紐西蘭 </p></div>'
    }, {
      tag: 'div',
      class: 'tp-caption sft',
      x: 'right',
      hoffset: 0,
      y: 'center',
      speed: 1600,
      start: 1800,
      easing: 'Power4.easeOut',
      endspeed: 300,
      endeasing: 'Power1.easeIn',
      captionhidden: 'off',
      html: '<div class="slide-font-32 color-light" style="z-index: 6; border-color: white; border: solid 1px; padding: 5px;"> 蜜月佳偶及現場報名<br> 即可獲得神祕小禮！ </div>'
    }, {
      tag: 'div',
      class: 'tp-caption lfl',
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
      html: '<div class="revolution-ch1" style="z-index: 6; border-color: white; border-top: solid 1px; border-bottom: solid 3px; padding: 5px;"> <p class="color-light slide-font-25"> 2015-2016年 </p> <strong class="color-light slide-font-30 font-kai"> 【OFF慢遊】系列 紐西蘭行程發表會 </strong> </div>'
    }, {
      tag: 'div',
      class: 'tp-caption lfb',
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
      html: '<div class="revolution-ch1" style="z-index: 6; border-color: white; border-top: solid 3px; border-bottom: solid 1px; padding: 5px;"> <p class="color-light slide-font-30"> 時間：2015/10/17 下午2:00PM </p> <p class="color-light slide-font-25"> 地點：樂遊旅行社2樓 會議室 </p> </div>'
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
      class: 'tp-caption lft',
      x: 'center',
      hoffset: 0,
      y: 'top',
      voffset: 135,
      speed: 2000,
      start: 500,
      easing: 'Power4.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<div class="revolution-ch1"><p class="color-light slide-font-50 font-kai"> 戶外活動深度紐西蘭 </p></div>'
    }, {
      tag: 'div',
      class: 'tp-caption lfr',
      x: 'right',
      hoffset: 0,
      y: 'bottom',
      voffset: 40,
      speed: 2000,
      start: 1000,
      easing: 'Power1.easeIn',
      endeasing: 'Power1.easeIn',
      endspeed: 300,
      html: '<div class="tag-box revolution-ch1 tag-box-v2" style="background-color: rgba(250,250,250,0.45)"> <p class="color-black slide-font-23"> 2015-2016 年 </p> <p class="slide-font-30 slide-padding-20 font-kai" style="color: #b63629;"> 戶外活動系列紐西蘭行程發表會 </p> <p class="color-black slide-font-20"> 時間: 2015/10/7 下午 2:00 PM </p> <p class="color-black slide-font-20"> 地點: 樂遊旅行社2樓 會議室 </p> </div>'
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

  function parseHtml(ss) {
    return ss.replace(/(https?:\/\/[^ $]*)/g, '<a href="$1" target="_blank">連接</a>')
      .replace(/\n/g, '<br>');
  }
  $http.get('/api/news/facebook/posts')
  .then(function(results) {
    $scope.fbData = _.map(results.data, function(data) {
      return {
        created_time: new Date(data.created_time),
        description: $sce.trustAsHtml(parseHtml(data.description || data.message || '')),
        full_picture: data.full_picture,
        link: data.link,
        name: data.name,
        story: data.story
      };
    });
  });
});
