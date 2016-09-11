'use strict';

angular.module('loyoApp')
.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 95;   // always scroll by 95 extra pixels
}])
.controller('PageCtrl', function($scope, $sce, $http, PageUtils, page) {
    $scope.pageid = page.id;
    $scope.feature = $sce.trustAsHtml(page.context.feature);
    $scope.specialize = $sce.trustAsHtml(page.context.specialize);
    $scope.details = _.map(page.context.details, function(data) {
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
    $scope.intro = page.context.intro;
    $scope.airplanes = PageUtils.transAirplaneRef(page.context.airplanes);
    $scope.productions = page.context.productions;
    $scope.isCollapsed = true;
})
.controller('SubCategoryCtrl', function($scope) {
})
.controller('CategoryCtrl', function($scope) {
});
