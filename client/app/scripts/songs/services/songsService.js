/**
 * Created by dminhquan on 3/7/2015.
 */

(function () {
  'use strict';
  angular.module('uiService')
    .factory('$songsService', ['$http', function ($http) {
      var api = {
        commonUrl: 'api/songs',
        querySongs: 'api/songs/query'
      };

      return {
        api: api,
        createSong: function(data){
          return $http.post(api.commonUrl, angular.toJson(data));
        },
        editSong: function(data){
          return $http.put(api.commonUrl, angular.toJson(data));
        },
        deleteSongs: function(data){
          var requestData = {data: angular.toJson(data), headers: {'Content-Type': 'application/json'}};
          return $http.delete(api.commonUrl, requestData);
        }
      };
    }]);
})();
