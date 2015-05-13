'use strict';

describe('Controller: StudentInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('softwareEngineeringApp'));

  var StudentInfoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentInfoCtrl = $controller('StudentInfoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
