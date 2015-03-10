/**
 * Created by dminhquan on 3/4/2015.
 */

(function () {
  'use strict';
  angular.module('uiService')
    .constant('AllMusicManagerAppIds', {
      SONGS: 'songs',
      PLAY_LISTS: 'playLists'
    })
    .factory('$layoutService', ['AllMusicManagerAppIds', function (AllMusicManagerAppIds) {
      var sideBarList = [
          {id: AllMusicManagerAppIds.SONGS, title: 'Songs', url: 'songs', icon: 'mm1'},
          {id: AllMusicManagerAppIds.PLAY_LISTS, title: 'PlayLists', url: 'playLists', icon: 'mm2'}
        ],
        findItemByKey = function(value, list, key){
          var result = null;

          angular.forEach(list, function(item){
            if (item[key] === value){
              result = item;
            }
          });
          return result;
        },
        findSideBarItem = function (value) {
          return findItemByKey(value, sideBarList, 'id');
        };

      return {
        sideBarList: sideBarList,
        findItemByKey: findItemByKey,
        findSideBarItem: findSideBarItem
      };
    }]);
})();
