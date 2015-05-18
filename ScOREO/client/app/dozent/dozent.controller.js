'use strict';

angular.module('softwareEngineeringApp')
  .controller('DozentCtrl', function ($scope, Auth, $http) {
    $scope.message = 'Hello';
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.getInfos = function () {
      $http.get('/api/users/me').success(function (userInfo) {

      });
    };
  });