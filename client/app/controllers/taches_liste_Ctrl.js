angular.module('moduletodo').controller("taches_liste_Ctrl",['$scope','$stateParams','tachesFactory','$state', 'orderByFilter', function($scope,$stateParams,tachesFactory,$state, orderBy){

			tachesFactory.query().$promise.then(
			                   	function(success){
			                   		$scope.listetaches = success;
			                   	}
			                   	,
			                   	function(error){
			                   		console.log('erreur');
			                   	}
			                   );
			
			
			$scope.propertyName = 'Nom';
			  $scope.reverse = true;

			  $scope.sortBy = function(propertyName) {
				$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
				$scope.propertyName = propertyName;
			  };
			$scope.delete= function(todo)  {
				 todo.$delete();
			}
}]);


