'use strict';

angular.module('softwareEngineeringApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];
    $scope.studentenInfos = {
      vName: String,
      nName: String,
      gebDatum: Date,
      email: String,
      Vorlesungen: []
    };
    $scope.aktVorlesung = [];
    $scope.kritList = [];

    $scope.kritInfos = {
      impact: String,
      score: Boolean,
      gesScore: String,
      rate: String,
      isH2: String
    };

    $scope.getUserInfos = function () {
      $http.get('/api/users/me').success(function (userInfos) {
        $scope.studentenInfos = userInfos;
      });
    };

    $scope.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/things').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.ausgewaehlt = function () {
      $scope.aktVorlesung = $scope.studentenInfos.vorlesung[$scope.vorlSelect].Testate;
    };

    $scope.testAusgewaehlt = function () {
      $scope.kritList = $scope.aktVorlesung[0].Kriterien;
    };

    $scope.changeShowInfo = function () {
      angular.forEach($scope.kritList, function (value, key) {
        if (value.Kriterium == $scope.kritSelect) {
          $scope.kritInfos.impact = value.Impact;
          $scope.kritInfos.gesScore = $scope.aktVorlesung.Score;
          if (value.isH2) {
            $scope.kritInfos.isH2 = "H2 Bewertung";
          } else {
            $scope.kritInfos.isH2 = "Score Bewertung";
          }
          $scope.kritInfos.rate = "Rate";
        }
      });
    };

    $scope.addThing = function () {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function (thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });