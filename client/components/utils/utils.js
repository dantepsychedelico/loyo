'use strict';

angular.module('loyoApp')
.directive('dateTimePicker', function ($parse) {
  return {
    require: '^ngModel',
    restrict: 'AE',
    link: function (scope, elem, attrs, ngModelCtrl) {
      var options = angular.merge({
          format: 'YYYY-MM-DD a hh:mm',
          locale: 'zh-tw',
          useCurrent: false
//           debug: true
      }, $parse(attrs.dateTimePicker)(scope));
      elem.datetimepicker(options);
      ngModelCtrl.$formatters.push(function(value) {
        var invalid = value === null || value === '' || value === undefined;
        if (invalid) return value;
        var date = angular.isString(value) ? moment(value, options.format) : moment(value);
        return date.isValid() ? date.format(options.format) : value; 
      });
      elem.on('dp.change', function (event) {
        ngModelCtrl.$setViewValue(event.date ? event.date.format(options.format) : '');
      });
      elem.on('dp.hide', function(event) {
        scope.$eval(attrs.dpHide);
      });
      if (attrs.api) $parse(attrs.api).assign(scope, elem.data('DateTimePicker'));
    }
  };
});
