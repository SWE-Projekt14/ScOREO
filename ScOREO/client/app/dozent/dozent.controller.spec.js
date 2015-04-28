'use strict';

describe('Controller: DozentCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringApp'));

  var DozentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DozentCtrl = $controller('DozentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
