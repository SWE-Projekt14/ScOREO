'use strict';

angular.module('softwareEngineeringApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('neuerdozent', {
        url: '/neuerdozent',
        templateUrl: 'app/neuerdozent/neuerdozent.html',
        controller: 'NeuerdozentCtrl'
      });
  });