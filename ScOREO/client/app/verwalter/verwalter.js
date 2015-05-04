'use strict';

angular.module('softwareEngineeringApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('verwalter', {
        url: '/verwalter',
        templateUrl: 'app/verwalter/verwalter.html',
        controller: 'VerwalterCtrl'
      });
  });