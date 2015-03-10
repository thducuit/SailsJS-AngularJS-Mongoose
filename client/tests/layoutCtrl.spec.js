'use strict';

describe('Controller: LayoutCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var LayoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LayoutCtrl = $controller('LayoutCtrl', {
      $scope: scope
    });
  }));

  it('should defined scope.appTitle', function () {
    return angular.isDefined(scope.appTitle);
  });

  it('should defined scope.sideBarList', function () {
    return angular.isDefined(scope.sideBarList);
  });

  it('should defined scope.onSelectedSidebar', function () {
    return angular.isDefined(scope.onSelectedSidebar);
  });
});
