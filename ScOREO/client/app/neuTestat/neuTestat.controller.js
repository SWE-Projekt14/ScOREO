'use strict';

angular.module('softwareEngineeringApp')
  .controller('NeuTestatCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.message = 'Hello';
    
$scope.choices = [{id: 'choice1'}];
$scope.addNewChoice = function() {
  var newItemNo = $scope.choices.length+1;
  $scope.choices.push({'id':'choice'+newItemNo});
};
$scope.showAddChoice = function(choice) {
  return choice.id === $scope.choices[$scope.choices.length-1].id;
};    
       
$scope.impacts = [{id: 'impact1'}];
$scope.newKriteriums = [{id: 'kriterium1'}];    
$scope.addNewImpact = function() {
  var newItemNo = $scope.impacts.length+1;
  $scope.impacts.push({'id':'impact'+newItemNo});
  $scope.newKriteriums.push({'id':'kriterium'+newItemNo});
    
};
$scope.showAddImpact = function(impact) {
  return impact.id === $scope.impacts[$scope.impacts.length-1].id;
};   

$scope.showDeleteImpact = function(impact) {
    if ($scope.impacts.length > 1 ) {
  return impact.id === $scope.impacts[$scope.impacts.length-1].id;
    }
};      
       
$scope.deleteNewImpact = function() {
  var newItemNo = $scope.impacts.length+1;
  $scope.impacts.pop({'id':'impact'+newItemNo});
};    

// --------------------------------------------    

    
    
$scope.addThing = function() {
    if($scope.newThing === '') {
        return;
    }
    $http.post('/api/things', { name: $scope.newThing });
    $scope.newThing = '';
    }; 
     
$scope.addTestat = function() {
    if($scope.newTestat === ''){
        return;
    }
    if($scope.newKriterium === ''){
        return;
    }
    
    
    $http.post('/api/testates', {name: $scope.newTestat, kriterien:  $scope.newKriteriums, H2:$scope.isH2, impacts:$scope.impacts });
    console.log($scope.impacts);
    console.log($scope.newKriteriums);
    $scope.newTestat = '';
    $scope.newKriterium = '';
    };
        
    
    
  });


