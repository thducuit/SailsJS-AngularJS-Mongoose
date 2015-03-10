'use strict';

angular.module('uiService', []);
angular.module('uiComponent', ['uiService']);

angular.module('myAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMaterial',
  'uiService',
  'uiComponent'
])
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/songs'
      });

    //require disabled this when work with sails
    $locationProvider.html5Mode(false);

    $mdIconProvider
      .defaultIconSize(64)
      .defaultIconSet('./assets/svg/mm1.svg')
      .icon('mm1', './assets/svg/mm1.svg')
      .icon('mm2', './assets/svg/mm2.svg')
      .icon('mm3', './assets/svg/mm3.svg')
      .icon('menu', './assets/svg/menu.svg');

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
  });
