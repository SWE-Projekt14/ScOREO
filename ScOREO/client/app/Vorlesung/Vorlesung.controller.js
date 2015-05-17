'use strict';

angular.module('softwareEngineeringApp')
  .controller('VorlesungCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $scope.jahrgang = [];
    $scope.kurses = [];
    $scope.showKurs = true;

    $scope.getKursInfo = function () {
      $http.get('/api/kurs').success(function (kurs) {
        kurs.forEach(function (obj) {
          if ($.inArray(obj.jahrgang, $scope.jahrgang)) {
            $scope.jahrgang.push(obj.jahrgang);
          }
          $scope.kurses.push({
            name: obj.name,
            jahrgang: obj.jahrgang
          });
        });
      });
    };

    $scope.changeShowInfo = function () {
      $scope.showKurs = false;
    };

    $scope.sendVorlesung = function () {
      var uebergabe = $scope.vorlesung.name;
      $http.get('/api/users/me').success(function (infos) {
        $http.post('/api/users/addVorlesung', {
          name: uebergabe,
          kurs: $scope.vorlesung.kurs,
          _id: infos._id
        }).success(function (data) {});
      });
      $scope.vorlesung.name = '';
    };
  });