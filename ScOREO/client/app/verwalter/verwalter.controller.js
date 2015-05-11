'use strict';

angular.module('softwareEngineeringApp')
  .controller('VerwalterCtrl', function ($scope, $http, socket, Auth, $location) {
    

    // Funktion Studenten anlegen
    $scope.vorlesungen = [{id: 'vorlesung1'}];
    $scope.addNewVorlesung = function() {
        var newItemNo = $scope.vorlesungen.length+1;
        
        $scope.vorlesungen.push({'id':'vorlesung'+newItemNo});
    };
    $scope.showAddVorlesung = function(vorlesung) {
        return vorlesung.id === $scope.vorlesungen[$scope.vorlesungen.length-1].id;
    };
    
    $scope.showDeleteVorlesung = function(vorlesung) {
        if ($scope.vorlesungen.length > 1) {
            return vorlesung.id === $scope.vorlesungen[$scope.vorlesungen.length-1].id;
        }
    };
    
    $scope.deleteNewVorlesung = function() {
        var newItemNo = $scope.vorlesungen.length+1;
        $scope.vorlesungen.pop({'id':'vorlesung'+newItemNo});
    };
    
    $scope.addStudent = function() {
    if($scope.vname === '') {
        return;
    }
            
    $http.post('/api/studentens', {vName: $scope.user.name, nName: $scope.nName, GebDatum: $scope.GebDatum, stGeschl: $scope.stGeschl, stKurs: $scope.stKurs, vorlesungen: $scope.vorlesungen});
        
        
    console.log("test");
//      $scope.submitted = true;
        console.log($scope.user.role);
      //if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          role: $scope.user.role
        })
        console.log($scope.user.role);
       // $http.post('/api/users', {role: $scope.user.role});
    };    
    
    

});
