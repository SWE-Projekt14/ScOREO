'use strict';

describe('Controller: VerwalterCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringApp'));

  var VerwalterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VerwalterCtrl = $controller('VerwalterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
