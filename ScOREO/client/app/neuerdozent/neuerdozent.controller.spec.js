'use strict';

describe('Controller: NeuerdozentCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringApp'));

  var NeuerdozentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NeuerdozentCtrl = $controller('NeuerdozentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
