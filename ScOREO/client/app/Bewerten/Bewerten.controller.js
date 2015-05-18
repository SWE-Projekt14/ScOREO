'use strict';

angular.module('softwareEngineeringApp')
  .controller('BewertenCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';
    $scope.studentenInfos = {};
    $scope.studSaveList = [];
    $scope.studenteList = [];
    var update = {};
    var testatpf = {};
    var path = '';

    $scope.changeValue = function (wert) {
      path = 'vorlesung.' + wert;
      console.log(wert);
      $scope.studenteList = [];
      angular.forEach($scope.studSaveList, function (value, key) {
        if (value.vorlesung[wert]) {
          console.log(value[path]);
          update = {
            'vName': value.name,
            'nName': value.nName,
            'Testate': testatpf
          };
          $scope.studenteList.push(update);

        }
      });
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