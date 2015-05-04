'use strict';

angular.module('softwareEngineeringApp')
  .controller('VerwalterCtrl', function ($scope, $http, socket) {

    
// testblock  


    
    
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
            
    $http.post('/api/studentens', {vName: $scope.vName, nName: $scope.nName, GebDatum: $scope.GebDatum, stGeschl: $scope.stGeschl, stKurs: $scope.stKurs, vorlesungen: $scope.vorlesungen});
    };
        

});
