angular.module('moduletodo').controller("taches_todo_edit_Ctrl",['$scope','$stateParams','tachesFactory','$state', function($scope,$stateParams,tachesFactory,$state){


		tachesFactory.get({tskTodo : $stateParams.id}).$promise.then(
		function(success){
			$scope.todo = success;
			$scope.todo.Date=new Date($scope.todo.Date);
			$scope.todo.Heure=new Date($scope.todo.Heure);
		},
		function(error){
			console.log(error);
		}); 
			console.log($scope.todo);
		
			
		$scope.todo_edit_valide = function(todo){

			todo.$update().then(
				function(success){
					console.log(success);
					$state.go('taches_liste');
				},
				function(error){
					console.log('erreur edition');
				}
			);
		}


}]);
