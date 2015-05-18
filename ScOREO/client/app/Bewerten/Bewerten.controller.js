'use strict';

angular.module('softwareEngineeringApp')
  .controller('BewertenCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';
    $scope.studentenInfos = {};
    $scope.studSaveList = [];
    $scope.studenteList = [];
    $scope.testatList = [];
    var update = {};

    $scope.changeValue = function (wert) {
      $scope.studenteList = [];
      angular.forEach($scope.studSaveList, function (value, key) {
        if (value.vorlesung[wert]) {
          update = {
            'vName': value.name,
            'nName': value.nName,
            'Testate': value.vorlesung[wert].Testate
          };
          $scope.testatList = value.vorlesung[wert].Testate;
          $scope.studenteList.push(update);
          console.log($scope.testatList);
        }
      });
    };

    $scope.saveCalc = function () {
      $http.post('/api/users/berechne', {
        stKurs: $scope.studentenInfos.stKurs,
        vorl: $scope.testattitel,
        testat: $scope.testattiteltt
      }).success(function (data) {});
    };

    $scope.getUserInfos = function () {
      $http.get('/api/users/me').success(function (kurse) {
        $scope.studentenInfos = kurse;
      });
      $http.get('/api/users/testatUser').success(function (userInfos) {
        $scope.studSaveList = userInfos;
      });
    };
  });