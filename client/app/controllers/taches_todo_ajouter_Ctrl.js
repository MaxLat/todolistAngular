angular.module('moduletodo').controller("taches_todo_ajouter_Ctrl",['$scope','$stateParams','tachesFactory','$state', function($scope,$stateParams,tachesFactory,$state){

		$scope.listetaches = tachesFactory.query();

		$scope.create = function(newUser) {
				var todo = new tachesFactory();
				for(var i in newUser){todo[i] = newUser[i]};
				todo.$save().then(
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