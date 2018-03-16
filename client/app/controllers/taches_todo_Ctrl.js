angular.module('moduletodo').controller("taches_todo_Ctrl",
[
'$scope',
'$stateParams',
'tachesFactory',
function($scope,
$stateParams,
tachesFactory){
	tachesFactory.get({
		tskTodo: $stateParams.id
	}).$promise.then(
		function(success){
			$scope.todo = success;
			//$scope.todo.Date=new Date($scope.todo.Date);
			$scope.todo.Date=moment(new Date($scope.todo.Date)).format('L');
			$scope.todo.Heure=moment(new Date($scope.todo.Heure)).format('LT');
		},
		function(error){
			console.log(error);
		}); ;
}]);