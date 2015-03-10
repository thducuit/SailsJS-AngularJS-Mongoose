/**
 * Created by dminhquan on 3/6/2015.
 */
(function () {
  'use strict';
  angular.module('uiComponent')
    .directive('spinner', ['$http', '$templateCache', '$compile',
      function ($http, $templateCache, $compile) {
      return {
        restrict: 'A',
        scope: {
          spinner: '=',
          config: '=?'
        },
        link: function (scope, elm) {
          var compileTemplate;

          elm.addClass('position-relative');

          $http({
            method: 'GET',
            url: 'components/spinner/spinner.html',
            cache: $templateCache
          }).success(function (tpl) {
            scope.newScope = scope.$new();
            compileTemplate = $compile(tpl)(scope.newScope);
            elm.append(compileTemplate);
          });

          scope.$on('$destroy', function(){
            elm.removeClass('position-relative');

            if (compileTemplate) {
              compileTemplate.remove();
              compileTemplate = null;
            }
          });
        }
      };
    }]);
})();
