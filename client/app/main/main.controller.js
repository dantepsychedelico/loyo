'use strict';

angular.module('loyoApp')
.controller('MainCtrl', function ($scope, $http, $window, FB) {
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
  $http.get('/api/news/facebook/posts')
  .then(function(results) {
    console.log(results.data);
    $scope.fbData = _.map(results.data, function(data) {
      return {
        created_time: new Date(data.created_time),
        description: (data.description || data.message || '').replace(/\n/g, '<br>'),
        full_picture: data.full_picture,
        link: data.link,
        name: data.name,
        story: data.story
      }
    });
  });
});
