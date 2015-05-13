'use strict';

angular.module('softwareEngineeringApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Dozent',
      'link': '/dozent'
    },{
      'title': 'Bewerten',
      'link': '/Bewerten'
    },{
      'title': 'Neues Testat',
      'link': '/neuesTestat'
    },{
      'title': 'Benutzer anlegen',
      'link': '/verwalter'
    },{
      'title': 'Kurs hinzufügen',
      'link': '/Kurs'
    },{
      'title': 'Vorlesung hinzufügen',
      'link': '/Vorlesung'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });