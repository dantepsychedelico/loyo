'use strict';

angular.module('loyoApp')
.controller('MainCtrl', function ($scope, $http, $window, $sce) {
  $scope.window = {
    width: $window.innerWidth,
    height: $window.innerHeight
  };
  $scope.masonryOptions = {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 10
  };
  function parseHtml(ss) {
    return ss.replace(/(https?:\/\/[^ $]*)/g, '<a href="$1" target="_blank">連接</a>')
      .replace(/\n/g, '<br>');
  }
  $http.get('/api/news/facebook/posts')
  .then(function(results) {
    console.log(results.data);
    $scope.fbData = _.map(results.data, function(data) {
      return {
        created_time: new Date(data.created_time),
        description: $sce.trustAsHtml(parseHtml(data.description || data.message || '')),
        full_picture: data.full_picture,
        link: data.link,
        name: data.name,
        story: data.story
      }
    });
  });
});
