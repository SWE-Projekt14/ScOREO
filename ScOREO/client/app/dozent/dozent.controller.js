'use strict';

angular.module('softwareEngineeringApp')
  .controller('DozentCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
