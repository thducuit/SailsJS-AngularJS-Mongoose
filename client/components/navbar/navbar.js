(function () {
  'use strict';
  angular.module('uiComponent')
    .directive('navBar', [function () {
      return {
        restrict: 'EA',
        scope: {
          nvList: '=',
          nvModel: '=?',
          selectedCallback: '=?'
        },
        templateUrl: 'components/navbar/navbar.html',
        link: function (scope) {
          scope.isCollapsed = true;
          scope.selectSidebarItem = function(item){
            scope.nvModel = item;
            if (angular.isFunction(scope.selectedCallback)){
              scope.selectedCallback(scope.nvModel);
            }
          };
        }
      };
    }]);
})();
