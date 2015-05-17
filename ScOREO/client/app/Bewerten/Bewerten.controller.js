'use strict';

angular.module('softwareEngineeringApp')
  .controller('BewertenCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';
    $scope.studentenInfos = {};
    $scope.studenteList = [];

    $scope.getUserInfos = function () {
      $http.get('/api/users/me').success(function (kurse) {
        $scope.studentenInfos = kurse;
        console.log($scope.studentenInfos);
      });
      $http.get('/api/users/').success(function (userInfos) {
        console.log(userInfos);
        console.log($scope.testattitel);
        /*angular.forEach(userInfos, function (value, key) {
          if (userInfos[key] == $scope.studentenInfos) {
            $scope.studenteList.push({
              'vName': userInfos.name,
              'nName': userInfos.nName
            });
          }
        });*/
      });
    };
  });