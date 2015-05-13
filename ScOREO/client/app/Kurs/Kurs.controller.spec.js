'use strict';

describe('Controller: KursCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringApp'));

  var KursCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KursCtrl = $controller('KursCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
