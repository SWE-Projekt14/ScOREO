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
$scope.kriteriums = [{id: 'kriterium1'}];
$scope.isH2s = [{id: 'isH21'}];    
$scope.addNewImpact = function() {
  var newItemNo = $scope.impacts.length+1;
  $scope.impacts.push({'id':'impact'+newItemNo});
  $scope.kriteriums.push({'id':'kriterium'+newItemNo});
  $scope.isH2s.push({'id':'isH2'+newItemNo});
    
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
  $scope.kriteriums.pop({'id':'kriterium'+newItemNo});
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
    if($scope.kriteriums === ''){
        return;
    }
    
    
    $http.post('/api/testates', {name: $scope.newTestat, kriteriums:$scope.kriteriums, H2s:$scope.isH2s, impacts:$scope.impacts });
    console.log($scope.impacts);
    console.log($scope.kriteriums);
    $scope.newTestat = '';
    $scope.kriteriums = '';
    };

        
    
    
  });


