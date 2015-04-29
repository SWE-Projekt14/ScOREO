'use strict';

describe('Controller: NeuTestatCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringApp'));

  var NeuTestatCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NeuTestatCtrl = $controller('NeuTestatCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
