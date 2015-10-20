'use strict';

angular.module('loyoApp')
.controller('searchResults', function($scope, $filter, search) {
  $scope.gridOptions = {
    columnDefs: [
      { headerName: '#', field: '#', cellRenderer: function(params) {
        return params.rowIndex+1;
      }, width: 50},
      { headerName: '出發日期', field: '出發日期', headerGroup: '日期', 
        cellRenderer: function(params) {
          return moment(params.data['出發日期']).format('YYYY-MM-DD a hh:mm');
      }, width: 150},
      { headerName: '回程日期', field: '回程日期', headerGroup: '日期', 
        headerGroupShow: 'open',
        cellRenderer: function(params) {
        return moment(params.data['出發日期']).format('YYYY-MM-DD a hh:mm');
      }, width: 150},
      { headerName: '天數', field: '天數', headerGroup: '日期', width: 60,
        headerGroupShow: 'open',
      },
      { headerName: '產品名稱', field: '產品名稱', width: 400},
      { headerName: '團費售價(TWD)', field: '團費售價', width: 135, 
        cellRenderer: function(params) {
          return params.data['團費售價'] ? 
            $filter('currency')(params.data['團費售價'], '$', 0) :
            '請電恰';
        }
      },
      { headerName: '剩餘名額', field: '可報名', width: 96},
      { headerName: '備註', field: '備註', width: 150}
    ],
    rowData: search.data,
    enableColResize: true,
    enableSorting: true,
    rowSelection: 'single',
//     angularCompileRows: true,
//     angularCompileHeaders: true,
//     angularCompileFilters: true,
    enableFilter: true,
    rowHeight: 40,
    groupHeaders: true,
    pinnedColumnCount: 1,
//     headerHeight: 30,
    rowClass: ''
  }
  $scope.agGridStyle = {
    'max-width': _.reduce($scope.gridOptions.columnDefs, function(total, colDef) {
      return total + colDef.width;
    }, 17-210)
  };
});
