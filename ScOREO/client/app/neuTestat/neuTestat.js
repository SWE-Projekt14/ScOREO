'use strict';

angular.module('softwareEngineeringApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('neuTestat', {
        url: '/neuesTestat',
        templateUrl: 'app/neuTestat/neuTestat.html',
        controller: 'NeuTestatCtrl'
      });
  });