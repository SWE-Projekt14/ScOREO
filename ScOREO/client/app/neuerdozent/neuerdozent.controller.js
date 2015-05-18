'use strict';

angular.module('softwareEngineeringApp')
  .controller('NeuerdozentCtrl', function ($scope, $http, socket, Auth, $location) {
    
    $scope.addDozent = function() {
    if($scope.vname === '') {
        return;
    }
            
    $http.post('/api/dozents', {vName: $scope.user.name, nName: $scope.nName, GebDatum: $scope.GebDatum, stGeschl: $scope.stGeschl, stKurs: $scope.stKurs, vorlesungen: $scope.vorlesungen});
        

        $scope.user.name='';
        $scope.nName = '';
        $scope.GebDatum = '';
        $scope.stGeschl = '';
        $scope.stKurs = '';
        $scope.vorlesungen = '';
       // $scope.user.email = '';
        $scope.user.password = '';
        
    };        
    
    
  });
