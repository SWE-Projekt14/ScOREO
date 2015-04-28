'use strict';

angular.module('softwareEngineeringApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dozent', {
        url: '/dozent',
        templateUrl: 'app/dozent/dozent.html',
        controller: 'DozentCtrl'
      });
  });