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
  $scope.pageSlideId = '569792fafb9bf55a150fee7f';
  $scope.getPageSlide = function(rsApi) {
    $http.get('/api/pages/pageSlide/'+$scope.pageSlideId)
    .then(function(results) {
      $scope.rsOptions = results.data.options;
      $scope.rsOptions.fullScreen = 'on';
      $scope.sliders = results.data.slides;
      if (rsApi) rsApi.restart();
    });
  };
  $scope.getPageSlide();

  function parseHtml(ss) {
    return ss.replace(/(https?:\/\/[^ $]*)/g, '<a href="$1" target="_blank">連接</a>')
      .replace(/\n/g, '<br>');
  }
  $http.get('/api/news/facebook/posts')
  .then(function(results) {
    $scope.fbData = _.filter(_.map(results.data, function(data) {
      return {
        created_time: new Date(data.created_time),
        description: $sce.trustAsHtml(parseHtml(data.description || data.message || '')),
        full_picture: data.full_picture,
        link: data.link,
        name: data.name,
        story: data.story
      };
    }), function(data) {
      return data.description;
    });
  });
});
