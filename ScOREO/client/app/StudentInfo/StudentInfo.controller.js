'use strict';

angular.module('softwareEngineeringApp')
  .controller('StudentInfoCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';
    $scope.studentenInfos = {
      vName: String,
      nName: String,
      gebDatum: Date,
      eMail: String,
      Vorlesungen: []
    };

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.getStudentInfos = function () {

    };
  });