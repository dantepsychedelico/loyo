'use strict';

angular.module('loyoApp')
.run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 95;   // always scroll by 95 extra pixels
}])
.controller('PageCtrl', function($scope, $sce, $http, PageUtils, page) {
  $scope.pageid = page.id;
  $http.get('/api/pages/context/'+page.id)
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
    $scope.airplanes = PageUtils.transAirplaneRef(results.data.airplanes);
    $scope.productions = results.data.productions;
  });
  $scope.isCollapsed = true;
})
.controller('SubCategoryCtrl', function($scope) {
})
.controller('CategoryCtrl', function($scope) {
});
