/**
 * Created by dminhquan on 3/3/2015.
 */
(function () {
  'use strict';
  angular.module('myAppApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/songs', {
          templateUrl: 'app/scripts/layout.html',
          controller: 'songCtrl'
        });
    })
    .controller('songCtrl', ['$scope', 'AllMusicManagerAppIds', '$layoutService', '$utility', '$songsService',
      function ($scope, AllMusicManagerAppIds, $layoutService, $utility, $songsService) {
        $scope.currentContentTpl = 'app/scripts/songs/templates/songsShow.html';
        $scope.selectedSideBar = $layoutService.findSideBarItem(AllMusicManagerAppIds.SONGS);

        $scope.alertObj = {};

        $scope.songsObj = {
          selectedList: [],
          configObj: {}
        };

        $scope.config = {
          selectFieldList: [
            {title: 'Title', value: 'title'},
            {title: 'Description', value: 'description'}
          ],
          api: 'api/songs/query'
        };
        $scope.config.sortBy = $scope.config.selectFieldList[0];

        $scope.headerObj = {
          title: 'Songs Manager',
          headerShow: function(){
            return $scope.currentContentTpl === $scope.viewState.templateUrl;
          },
          buttonDisabled: {
            create: function(){
              return false;
            },
            edit: function(){
              return $scope.songsObj.selectedList.length !== 1;
            },
            delete: function(){
              return $scope.songsObj.selectedList.length === 0;
            },
            refresh: function(){
              return false;
            }
          },
          buttonAction: {
            create: function(){
              angular.extend($scope.songsObj.configObj, $scope.createState);
              $scope.songsObj.configObj.active();
            },
            edit: function(){
              angular.extend($scope.songsObj.configObj, $scope.editState);
              $scope.songsObj.configObj.active();
            },
            delete: function($event){
              $scope.deleteObj.active($event);
            },
            refresh: function(){
              $scope.config.resetData();
            }
          }
        };

        $scope.viewState = {
          name: 'view',
          templateUrl: 'app/scripts/songs/templates/songsShow.html',
          active: function(){
            $scope.currentContentTpl = this.templateUrl;
          }
        };

        $scope.createState = {
          name: 'create',
          title: 'Create a song',
          templateUrl: 'app/scripts/songs/templates/songsConfig.html',
          finishLabel: 'Create',
          cancelLabel: 'Cancel',
          active: function(){
            $scope.currentContentTpl = this.templateUrl;
          },
          clear: function(){
            this.data = null;
          },
          canFinish: function(){
            return true;
          },
          performFinish: function(){
            var createState = this;
            $songsService.createSong(createState.data).success(function(res){
              if (res.message){
                $scope.alertObj.info(res.message);
                return;
              }
              createState.performCancel();
            }).error(function(msg){
              $scope.alertObj.error(msg.message);
            });
          },
          canCancel: function(){
            return true;
          },
          performCancel: function(){
            this.clear();
            $scope.viewState.active();
          }
        };

        $scope.editState = {
          name: 'edit',
          title: 'Edit a song',
          templateUrl: 'app/scripts/songs/templates/songsConfig.html',
          finishLabel: 'Edit',
          cancelLabel: 'Cancel',
          active: function(){
            this.data = $scope.songsObj.selectedList[0];
            this.disabledAttrs = {
              title: true
            };
            $scope.currentContentTpl = this.templateUrl;
          },
          clear: function(){
            this.data = null;
            this.disabledAttrs = null;
          },
          canFinish: function(){
            return true;
          },
          performFinish: function(){
            var editState = this;
            $songsService.editSong(editState.data).success(function(res){
              if (res.message){
                $scope.alertObj.info(res.message);
                return;
              }
              editState.performCancel();
            }).error(function(res){
              $scope.alertObj.error(res.message);
            });
          },
          canCancel: function(){
            return true;
          },
          performCancel: function(){
            this.clear();
            $scope.viewState.active();
          }
        };

        $scope.deleteObj = {
          active: function($event){
            $utility.showDeleteDialog($event, function finishCallback(){
              var postData = $scope.songsObj.selectedList.map(function(song){
                  return song._id;
                });
              $songsService.deleteSongs(postData).success(function(res){
                $scope.alertObj.info(res.message);
                $scope.headerObj.buttonAction.refresh();
              }).error(function(res){
                $scope.alertObj.error(res.message);
              });
            });
          }
        };
      }]);
})();
