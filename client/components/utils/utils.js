'use strict';

angular.module('loyoApp')
.directive('dateTimePicker', function ($parse, $timeout) {
  return {
    require: '?ngModel',
    restrict: 'AE',
    link: function (scope, elem, attrs, ngModelCtrl) {
      var options = {
        format: attrs.format || 'YYYY/MM/DD HH:mm',
        pick12HourFormat: attrs.pick12HourFormat,
        locale: attrs.locale || 'zh_tw',
        useCurrent: attrs.useCurrent,
//                     debug: true
      };
      if (attrs.minDate) {
        if (moment($parse(attrs.minDate)(scope)).isValid()) options.minDate = $parse(attrs.minDate)(scope);
        if (attrs.minDate[0] !== '\'') {
            scope.$watch(attrs.minDate, function(newVal, oldVal) {
              if (moment(newVal).isValid()) elem.data('DateTimePicker').minDate(newVal);
            });
        }
      }
      if (attrs.maxDate) {
        if (moment($parse(attrs.maxDate)(scope)).isValid()) options.maxDate = $parse(attrs.maxDate)(scope);
        if (attrs.maxDate[0] !== '\'') {
            scope.$watch(attrs.maxDate, function(newVal) {
              if (moment(newVal).isValid()) elem.data('DateTimePicker').maxDate(newVal);
            });
        }
      }
      elem.datetimepicker(options);
      attrs.$observe('format', function(value) {
        elem.data('DateTimePicker').format(value);
      });
      ngModelCtrl.$formatters.push(function(value) {
        var invalid = value === null || value === '' || value === undefined;
        if (invalid) return value;
        var date = new Date(value);
        return _.isNaN(date.valueOf()) ? value : moment(date).format(options.format);
      });
      elem.on('dp.change', function (event) {
        ngModelCtrl.$setViewValue(event.date ? event.date.format(options.format) : '');
//                     scope.$digest();
      });
      elem.on('dp.hide', function(event) {
        scope.$eval(attrs.dpHide);
//                     ngModelCtrl.$setViewValue(event.date ? event.date.format(options.format) : '');
        $timeout(function() {
          ngModelCtrl.$setViewValue(elem.data('date'));
        }, 0);
        scope.$digest();
      });
      if (attrs.api) $parse(attrs.api).assign(scope, elem.data('DateTimePicker'));
    }
  };
});
