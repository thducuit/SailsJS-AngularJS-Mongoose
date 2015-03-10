/**
 * Created by dminhquan on 3/3/2015.
 */

(function () {
  'use strict';
  angular.module('myAppApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/playLists', {
          templateUrl: 'app/scripts/layout.html',
          controller: 'playListsCtrl'
        });
    })
    .controller('playListsCtrl', ['$scope', 'AllMusicManagerAppIds', '$layoutService', function ($scope, AllMusicManagerAppIds, $layoutService) {
      $scope.title = 'PlayLists Manager';
      $scope.currentContentTpl = 'app/scripts/playLists/templates/playListsShow.html';
      $scope.selectedSideBar = $layoutService.findSideBarItem(AllMusicManagerAppIds.PLAY_LISTS);

      $scope.alertObj = {};

      $scope.playListsObj = {
        selectedList: [],
        configObj: {}
      };

      $scope.config = {
        selectFieldList: [
          {title: 'Title', value: 'title'},
          {title: 'Description', value: 'description'}
        ],
        api: 'api/playlists/query'
      };
      $scope.config.sortBy = $scope.config.selectFieldList[0];
    }]);
})();
