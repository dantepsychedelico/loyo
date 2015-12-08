'use strict';

angular.module('loyoApp')
.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 95;   // always scroll by 50 extra pixels
}])
.controller('NewZealandPage1', function($scope, $sce, $http, search) {
  $scope.pageid = '56631059febd819fbda81b80';
  $http.get('/api/pages/context/'+$scope.pageid)
  .then(function(results) {
    $scope.feature = $sce.trustAsHtml(results.data.feature);
    $scope.specialize = $sce.trustAsHtml(results.data.specialize);
    $scope.details = _.map(results.data.details, function(data) {
      return {
        title: data.title,
        context: $sce.trustAsHtml(data.context),
        slides: data.slides,
        hotel: data.hotel,
        breakfast: data.breakfast,
        lunch: data.lunch,
        dinner: data.dinner
      };
    });
    $scope.intro = results.data.intro;
  });
  $scope.isCollapsed = true;

  var airplaneRef = [{
    through: [{
      day: '第 1 天',
      from: '台北',
      to: '奧克蘭',
      time: '23:00-17:50+1',
      airplane: '中華航空',
      flightNo: 'C151',
    }, {
      from: '羅吐魯阿',
      to: '皇后鎮',
      time: '09:10-12:35',
      airplane: '紐西蘭航空',
      flightNo: 'NZ5863'
    }, {
      day: '第 12 天',
      from: '基督城',
      to: '台北',
      time: '19:15-04:30+1',
      airplane: '中華航空',
      flightNo: 'C156'
    }]
  }, {
  }];
  function transAirplaneRef(airplanRef) {
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
  $scope.airplanes = transAirplaneRef(airplaneRef);
  $scope.productions = search.data;
});
