angular.module('moduletodo').controller("taches_todo_ajouter_Ctrl",['$scope','$stateParams','tachesFactory','$state', function($scope,$stateParams,tachesFactory,$state){

		tachesFactory.query().$promise.then(
					function(success){
						$scope.listetaches = success;
						var index=0;
						moment.locale('fr');

						$scope.listetaches.forEach(function(item){
							$scope.listetaches[index].Date=moment(new Date(item.Date)).format('L');
							$scope.listetaches[index].Heure=moment(new Date(item.Heure)).format('LT');
							index++;
						});
					}
					,
					function(error){
						console.log('erreur');
					}
				);
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