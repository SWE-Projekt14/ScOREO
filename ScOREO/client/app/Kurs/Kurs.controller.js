'use strict';

angular.module('softwareEngineeringApp')
  .controller('KursCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.createKurs = function () {
      $http.post('/api/kurs', {
        name: $scope.name,
        jahrgang: $scope.jahrgang
      }).success(function (data) {});
      $scope.name = '';
    };
  });