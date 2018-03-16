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
				todo.$delete().then(
					function(success){
						tachesFactory.query().$promise.then(
							function(success){
								$scope.listetaches = success;
							}
							,
							function(error){
								console.log('erreur');
							}
						);
					},
					function(error){
							console.log('erreur');
					}
				 )
			}
			
          socket.on('editTodo', function(data) {
				//alert('message: ' + data);
				var index=0;
				$scope.listetaches.forEach(function(item){
					if(item._id==data.id){
						$scope.$apply(function(){$scope.listetaches[index]=data.todo;});
						//alert(data);
				}
				index++;
				})
				
				})
          socket.on('ajoutTodo', function(data) {
				var todo = new tachesFactory(data.success);
				$scope.$apply(function(){$scope.listetaches.push(todo);}
				);
          })
          socket.on('deleteTodo', function(data) {
				//alert('message: ' + data);
				var index=0;
				$scope.listetaches.forEach(function(item){
					if(item._id==data){
						//alert(data);
					$scope.$apply(function(){$scope.listetaches.splice(index,1);});
				}
				index++;
				})

          })

}]);


