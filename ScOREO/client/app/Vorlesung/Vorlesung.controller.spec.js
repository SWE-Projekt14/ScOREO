'use strict';

describe('Controller: VorlesungCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringApp'));

  var VorlesungCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VorlesungCtrl = $controller('VorlesungCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
