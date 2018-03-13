angular.module('Description').controller("taches_todo_Ctrl",
[
'$scope',
'$stateParams',
'tachesFactory',
function($scope,
$stateParams,
tachesFactory){
	$scope.todo=tachesFactory.get({
		tskTodo: $stateParams.id
	});
}]);