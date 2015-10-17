'use strict';

angular.module('loyoApp')
.directive('dateTimePicker', function () {
  return {
    require: '^ngModel',
    restrict: 'AE',
    link: function (scope, elem, attrs, ngModelCtrl) {
      var options = {
          format: attrs.format || 'YYYY-MM-DD a hh:mm',
          pick12HourFormat: attrs.pick12HourFormat,
          locale: 'zh-tw',
          useCurrent: attrs.useCurrent,
//           debug: true
      };
      elem.datetimepicker(options);
      ngModelCtrl.$formatters.push(function(value) {
        var invalid = value === null || value === '' || value === undefined;
        if (invalid) return value;
        var date = new Date(value);
        return _.isNaN(date.valueOf()) ? value : moment(date).format(options.format);
      });
      elem.on('dp.change', function (event) {
        ngModelCtrl.$setViewValue(event.date ? event.date.format(options.format) : '');
      });
      elem.on('dp.hide', function(event) {
        scope.$eval(attrs.dpHide);
      });
    }
  };
});
