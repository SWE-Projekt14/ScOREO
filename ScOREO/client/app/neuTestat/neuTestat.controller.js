'use strict';

angular.module('softwareEngineeringApp')
  .controller('NeuTestatCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.message = 'Hello';
    $scope.userInfo = {};
    $scope.vorlesungenList;
    $scope.kurses = [];
    $scope.showH2 = false;

    $scope.choices = [{
      id: 'choice1'
    }];
    $scope.addNewChoice = function () {
      var newItemNo = $scope.choices.length + 1;
      $scope.choices.push({
        'id': 'choice' + newItemNo
      });
    };
    $scope.showAddChoice = function (choice) {
      return choice.id === $scope.choices[$scope.choices.length - 1].id;
    };

    $scope.impacts = [{
      id: 'impact1'
    }];
    $scope.kriteriums = [{
      id: 'kriterium1'
    }];
    $scope.isH2s = [{
      id: 'isH21'
    }];
    $scope.krit_choose_impacts = [{
      id: 'krit_choose_impact1'
    }];
    $scope.addNewImpact = function () {
      var newItemNo = $scope.impacts.length + 1;

      $scope.kriteriums.push({
        'id': 'kriterium' + newItemNo
      });
      $scope.isH2s.push({
        'id': 'isH2' + newItemNo
      });
      $scope.impacts.push({
        'id': 'impact' + newItemNo
      });
      $scope.krit_choose_impacts.push({
        'id': 'krit_choose_impact' + newItemNo
      });

    };
    $scope.showAddImpact = function (impact) {
      return impact.id === $scope.impacts[$scope.impacts.length - 1].id;
    };
    $scope.showDeleteImpact = function (impact) {
      if ($scope.impacts.length > 1) {
        return impact.id === $scope.impacts[$scope.impacts.length - 1].id;
      }
    };

    $scope.deleteNewImpact = function () {
      var newItemNo = $scope.impacts.length + 1;
      $scope.impacts.pop({
        'id': 'impact' + newItemNo
      });
      $scope.kriteriums.pop({
        'id': 'kriterium' + newItemNo
      });
      $scope.isH2s.pop({
        'id': 'isH2' + newItemNo
      });
    };

    // --------------------------------------------    
    $scope.changeH2 = function (wert) {
      $scope.showH2 = wert;
    };

    $scope.addTestat = function () {
      var sendTestat = [];
      if ($scope.newTestat === '') {
        return;
      }
      if ($scope.kriteriums === '') {
        return;
      }
      angular.forEach($scope.impacts, function (value, key) {
        var isH2ss = false;
        if ($scope.isH2s[key].value == 'H2') {
          isH2ss = true;
        } else {
          isH2ss = false;
        }
        sendTestat.push({
          'Impact': $scope.impacts[key].value,
          'Kriterium': $scope.kriteriums[key].value,
          'isH2': isH2ss
        });
      });

      $http.post('/api/users/addTestat', {
        _id: $scope.userInfo._id,
        vorlesung: $scope.testat.vorlesung,
        titel: $scope.testat.testat,
        kurs: $scope.testat.kurs,
        testate: sendTestat
      }).success(function (data) {});
      $scope.newTestat = '';
    };

    $scope.getVorlesungen = function () {
      $http.get('/api/users/me').success(function (userInfos) {
        $scope.userInfo = userInfos;
        $scope.vorlesungenList = userInfos.vorlesung;
        console.log($scope.vorlesungenList);
      });

      $http.get('/api/kurs').success(function (kurs) {
        kurs.forEach(function (obj) {
          $scope.kurses.push({
            name: obj.name
          });
        });
      });
    };
  });