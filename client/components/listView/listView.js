/**
 * Created by dminhquan on 3/3/2015.
 */
(function () {
  'use strict';
  angular.module('uiComponent')
    .directive('listView', ['$utility', '$http', function ($utility, $http) {
      return {
        restrict: 'EA',
        scope: {
          viewData: '=?',
          selectedList: '=?',
          config: '=?',
          selectedCallBack: '=?'
        },
        templateUrl: 'components/listView/listView.html',
        link: function (scope) {
          var defaultConfig = {
            primaryKey: '_id',
            itemTemplate: 'components/listView/defaultContentTemplate.html',
            headerTemplate: 'components/listView/defaultHeaderTemplate.html',
            selectFieldList: [],
            searchString: '',
            dataLength: 0,
            sortBy: {},
            limitRow: 5,
            currentPage: 1,
            totalPage: 1,
            offset: 1,
            sortAsc: true
          };
          $utility.extendConfig(scope.config, defaultConfig);

          /*Paging*/
          scope.setPage = function (page) {
            if (page <= scope.config.totalPage && page > 0) {
              scope.config.currentPage = page;
            }
          };
          scope.canPrevPage = function(){
            return scope.config.currentPage > 1;
          };
          scope.canNextPage = function(){
            return scope.config.currentPage < scope.config.totalPage;
          };
          scope.setNextPage = function(){
            scope.setPage(scope.config.currentPage + 1);
          };
          scope.setPrevPage = function(){
            scope.setPage(scope.config.currentPage - 1);
          };
          scope.setFirstPage = function(){
            scope.setPage(1);
          };
          scope.setLastPage = function(){
            scope.setPage(scope.config.totalPage);
          };
          /*Paging*/

          scope.localData = {};
          scope.selectedList = scope.selectedList || [];

          var getData = _.debounce(function (/*event*/) {
            var reqParams = {
              offset: scope.config.currentPage,
              sort: scope.config.sortBy.value + ',' + (scope.config.sortAsc ? 'asc': 'desc'),
              limit: scope.config.limitRow,
              search: {
                key: scope.config.sortBy.value,
                value: scope.config.searchString
              }
            };

            scope.showSpinner = true;

            $http.post(scope.config.api, reqParams).success(function(data){
              scope.config.dataLength = data.total;
              scope.viewData = [];
              angular.forEach(data.data, function(item){
                var key = item[scope.config.primaryKey];
                scope.localData[key] = scope.localData[key] || {};
                angular.extend(scope.localData[key], item);
                scope.viewData.push(scope.localData[key]);
              });
              scope.selectedList = [];
              angular.forEach(scope.localData, function(item){
                if (item.checked){
                  scope.selectedList.push(item);
                }
              });
            }).finally(function(){
              scope.showSpinner = false;
            });
          }, 500);

          scope.selectItem = function(item){
            item.checked = !item.checked;
            scope.selectedList = [];
            angular.forEach(scope.localData, function(item){
              if (item.checked){
                scope.selectedList.push(item);
              }
            });
            if(angular.isFunction(scope.selectedCallBack)){
              scope.selectedCallBack(scope.selectedList);
            }
          };

          scope.$watchCollection(function(){
            return [
              scope.config.sortBy,
              scope.config.sortAsc,
              scope.config.searchString,
              scope.config.dataLength,
              scope.config.currentPage
            ];
          }, function (/*newVal, oldVal*/) {
            scope.showSpinner = true;
            scope.config.totalPage = Math.ceil(scope.config.dataLength / scope.config.limitRow);
            getData();
          });

          function assignFunction(){
            scope.config.getData = getData;
            scope.config.resetData = function(){
              scope.config.sortAsc = true;
              scope.config.searchString = '';
              scope.config.currentPage = 1;
              scope.localData = {};
              getData();
            };
          }

          assignFunction();
        }
      };
    }]);
})();
