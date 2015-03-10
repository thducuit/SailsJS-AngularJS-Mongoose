/**
 * Created by dminhquan on 3/6/2015.
 */
(function () {
  'use strict';
  angular.module('uiComponent')
    .directive('alert', ['$utility', function ($utility) {
      return {
        restrict: 'EA',
        scope: {
          alert: '=?'
        },
        templateUrl: 'components/alert/alert.html',
        link: function (scope) {
          var defaultAlert = {
            class: 'alert-success',
            msg: '',
            success: function(msg){
              this.show = true;
              this.msg = msg;
              this.class = 'alert-success';
            },
            error: function(msg){
              this.show = true;
              this.msg = msg;
              this.class = 'alert-danger';
            },
            info: function(msg){
              this.show = true;
              this.msg = msg;
              this.class = 'alert-info';
            },
            close: function(){
              this.show = false;
            }
          };
          $utility.extendConfig(scope.alert, defaultAlert);
        }
      };
    }]);
})();
