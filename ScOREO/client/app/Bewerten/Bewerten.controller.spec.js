'use strict';

describe('Controller: BewertenCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringApp'));

  var BewertenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BewertenCtrl = $controller('BewertenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
