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

    $scope.getUserInfos = function () {
      $http.get('/api/users/me').success(function (userInfos) {
        console.log(userInfos);
        $scope.studentenInfos = userInfos;
      });
    };
    $scope.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/things').success(function (awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.changeShowInfo = function (selVorl) {

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