angular.module('moduletest').controller("taches_liste_Ctrl",['$scope','$stateParams','tachesFactory','$state', 'orderByFilter', function($scope,$stateParams,tachesFactory,$state, orderBy){

			tachesFactory.query().$promise.then(
			                   	function(success){
			                   		$scope.listetaches = success;
			                   	}
			                   	,
			                   	function(error){
			                   		console.log('erreur');
			                   	}
			                   );
			
			
			//.$promise.then(
			//	function(success){
			//		$scope.count=0;
			//		
			//		for(var i in $scope.listetaches)
			//		{
			//			$scope.count++;
			//		}
			//	}
			//	,
			//	function(error){
			//		console.log('erreur');
			//	}
			//);

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


