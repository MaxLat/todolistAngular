angular.module('Description').controller("taches_todo_edit_Ctrl",['$scope','$stateParams','tachesFactory','$state', function($scope,$stateParams,tachesFactory,$state){

		$scope.todo = tachesFactory.get({tskTodo : $stateParams.id}); 
		$scope.todo_edit_valide = function(todo){
			console.log(todo);

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
