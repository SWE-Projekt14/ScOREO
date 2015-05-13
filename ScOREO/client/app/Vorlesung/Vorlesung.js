'use strict';

angular.module('softwareEngineeringApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Vorlesung', {
        url: '/Vorlesung',
        templateUrl: 'app/Vorlesung/Vorlesung.html',
        controller: 'VorlesungCtrl'
      });
  });