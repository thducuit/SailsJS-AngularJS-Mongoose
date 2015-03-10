/**
 * Created by dminhquan on 3/5/2015.
 */
(function () {
  'use strict';
  angular.module('uiService')
    .factory('$utility', ['$mdDialog', function ($mdDialog) {
      return {
        extendConfig: function (dst, src) {
          var tmpSrc = angular.copy(src);
          $.extend(true, tmpSrc, dst);
          angular.extend(dst, tmpSrc);
          return dst;
        },
        parseReqParams: function (reqObj) {
          var result = '?', lstResult = [];
          angular.forEach(reqObj, function (value, key) {
            lstResult.push(key + '=' + value);
          });
          return result + lstResult.join('&');
        },
        showDeleteDialog: function (ev, performActive, performCancel) {
          var confirm = $mdDialog.confirm()
            .title('Confirm')
            .content('Do you want to delete selected item')
            .ariaLabel('Lucky day')
            .ok('Delete')
            .cancel('Cancel')
            .targetEvent(ev);
          $mdDialog.show(confirm).then(function () {
            if (angular.isFunction(performActive)) {
              performActive();
            }
          }, function () {
            if (angular.isFunction(performCancel)) {
              performCancel();
            }
          });
        }
      };
    }]);
})();
