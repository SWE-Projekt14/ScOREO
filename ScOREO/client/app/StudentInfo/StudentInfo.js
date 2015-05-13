'use strict';

angular.module('softwareEngineeringApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('StudentInfo', {
        url: '/StudentInfo',
        templateUrl: 'app/StudentInfo/StudentInfo.html',
        controller: 'StudentInfoCtrl'
      });
  });