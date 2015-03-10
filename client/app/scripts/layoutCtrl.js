'use strict';

angular.module('myAppApp')
  .controller('LayoutCtrl', ['$scope', '$location', '$mdBottomSheet', '$mdSidenav', '$layoutService', '$utility',
    function ($scope, $location, $mdBottomSheet, $mdSidenav, $layoutService, $utility) {
      var defaultLayoutData = {
        appTitle: 'Music Manager',
        currentTpl: 'app/scripts/main.html',
        sideBarList: $layoutService.sideBarList,
        toggleList: function () {
          $mdSidenav('left').toggle();
        },
        onSelectedSidebar: function (sideBar) {
          $location.path(sideBar.url);
        }
      };

      $scope.layoutObj = $scope.layoutObj || {};
      $utility.extendConfig($scope.layoutObj, defaultLayoutData);
    }]
);
