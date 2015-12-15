'use strict';

angular.module('loyoApp')
.controller('navbarCtrl', function ($scope, $location, $state, navBar) {
  $scope.menu = [{
    'title': 'Home',
    'link': '/'
  }];
  $scope.categories = [
    { href: '我愛紐西蘭', subcategories: [
      { href: '樂遊紐西蘭團體旅遊行程', pnames: [
        { href: '【OFF慢遊】紐西蘭南島深度遊12天庫克山面山房,觀星,峽灣景觀飛機' }, 
        { href: '【精製慢遊】紐西蘭-奧克蘭愛戀皇后鎮峽灣奇異鳥螢火蟲庫克山冰河船10天' },
        { href: '【OFF慢遊】紐西蘭南北島溫泉鄉.峽灣.高山觀湖.庫克山12+1天《玩家領隊帶路》' },
        { href: '【OFF慢遊】紐西蘭南北島溫泉鄉.峽灣.金色箭鎮.黃金船.庫克山13天秋季版.保證面庫克山房' },
        { href: '【精緻慢遊】紐西蘭南島.螢火蟲.峽灣.金色箭鎮.黃金船.庫克山觀星10天(紐航秋季版)' }
      ]},
      { href: '自行車旅遊', pnames: [
        { href: '紐西蘭南島時尚休閒自行車旅13日' }
      ]},
      { href: '健行旅遊', pnames: [
        { href: '大自然-紐西蘭南島世界遺產秘境健走11天' }
      ]},
      { href: '露營車旅遊', pnames: [
        { href: '紐西蘭南島露營車酒莊皇后鎮活力10+1日' }
      ]},
      { href: '觀光巴士自助行', pnames: [
        { href: '紐西蘭南北島哈比人觀光巴士11日' }
      ]}
    ]},
    { href: '映像非洲', subcategories: [
      { href: '團體行程', pnames: [
        { href: '【豪情肯亞】肯亞山•埃爾門泰塔湖‧納古魯湖‧馬賽馬拉•長頸鹿莊園9日(內陸搭機)' }
      ]}
    ]},
    { href: '歐洲館', pnames: [
      { href: '【北歐】北歐極光屋、破冰船＆帝王蟹之旅10日' }
    ]},
    { href: '中東館', pnames: [
      { href: '土耳其輝煌榮耀鄂圖曼帝國歲月風華12日(3晚伊斯坦堡)入住CCR洞穴飯店升等房' }
    ]},
    { href: '南極館', pnames: [
      { href: '經典南極半島奇航16天之旅' }
    ]}
  ];
  navBar.promise
  .then(function() {
    console.log(navBar.getData());
//     _.forEach(navBar.getData(), function(data) {
//       var category = data.category;
//       var subcategory = data.subcategory;
//       var pname = data.pname;
//       var isExist = _.find($scope.category, {title: category});
//     });
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
      return _.find(data, {category: category, subcategory: subcategory, pname: pname})._id;
    }
  };
});
