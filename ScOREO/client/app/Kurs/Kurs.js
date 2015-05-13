'use strict';

angular.module('softwareEngineeringApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Kurs', {
        url: '/Kurs',
        templateUrl: 'app/Kurs/Kurs.html',
        controller: 'KursCtrl'
      });
  });