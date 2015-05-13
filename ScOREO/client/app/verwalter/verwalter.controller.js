'use strict';

angular.module('softwareEngineeringApp')
  .controller('VerwalterCtrl', function ($scope, $http, socket, Auth, $location) {

    // Funktion Studenten anlegen
    $scope.vorlesungen = [{
      id: 'vorlesung1'
    }];
    $scope.istStudent = true;
    $scope.pruefeSelect = function () {
      console.log($scope.user.role);
      if ($scope.user.role == 'dozent') {
        $scope.istStudent = true;
      } else {
        $scope.istStudent = false;
      }
      console.log($scope.istStudent);
    };
    $scope.addNewVorlesung = function () {
      var newItemNo = $scope.vorlesungen.length + 1;

      $scope.vorlesungen.push({
        'id': 'vorlesung' + newItemNo
      });
    };
    $scope.showAddVorlesung = function (vorlesung) {
      return vorlesung.id === $scope.vorlesungen[$scope.vorlesungen.length - 1].id;
    };

    $scope.showDeleteVorlesung = function (vorlesung) {
      if ($scope.vorlesungen.length > 1) {
        return vorlesung.id === $scope.vorlesungen[$scope.vorlesungen.length - 1].id;
      }
    };
    $scope.deleteNewVorlesung = function () {
      var newItemNo = $scope.vorlesungen.length + 1;
      $scope.vorlesungen.pop({
        'id': 'vorlesung' + newItemNo
      });
    };

    $scope.addStudent = function () {
      if ($scope.vname === '') {
        return;
      }

      Auth.createUser({
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password,
        role: $scope.user.role,
        nName: $scope.user.nName,
        gebDatum: $scope.user.GebDatum,
        stKurs: $scope.user.stKurs,
        stGeschl: $scope.user.geschlecht
      })
      $scope.user.name = '';
      $scope.user.nName = '';
      $scope.user.GebDatum = '';
      $scope.user.geschlecht = '';
      $scope.user.email = '';
      $scope.user.password = '';

    };



  });