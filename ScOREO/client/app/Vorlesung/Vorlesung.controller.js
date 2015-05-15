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
      $http.post('/api/users/addVorlesung', {
        name: $scope.vorlesung.name,
        kurs: $scope.vorlesung.kurs,
      }).success(function (data) {});
      $scope.vorlesung.name = '';
    };
  });