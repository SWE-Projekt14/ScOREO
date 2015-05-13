'use strict';

angular.module('softwareEngineeringApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Bewerten', {
        url: '/Bewerten',
        templateUrl: 'app/Bewerten/Bewerten.html',
        controller: 'BewertenCtrl'
      });
  });