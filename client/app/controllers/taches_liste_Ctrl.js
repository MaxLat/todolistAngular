angular.module('moduletodo').controller("taches_liste_Ctrl",['$scope','$stateParams','tachesFactory','$state', 'orderByFilter', function($scope,$stateParams,tachesFactory,$state, orderBy){

			tachesFactory.query().$promise.then(
					function(success){
						$scope.listetaches = success;
						var index=0;
						moment.locale('fr');

						$scope.listetaches.forEach(function(item){
							var m=((Date.parse($scope.listetaches[index].Date)-(Date.parse($scope.listetaches[index].Date)%86400))+Date.parse($scope.listetaches[index].Heure))-(new Date().valueOf());
							$scope.listetaches[index].class=(m<0)?"red":"blue";
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
								var index=0;
								moment.locale('fr');

								$scope.listetaches.forEach(function(item){
									var m=((Date.parse($scope.listetaches[index].Date)-(Date.parse($scope.listetaches[index].Date)%86400))+Date.parse($scope.listetaches[index].Heure))-(new Date().valueOf());
									$scope.listetaches[index].class=(m<0)?"red":"blue";
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
					var m=((Date.parse(data.todo.Date)-(Date.parse(data.todo.Date)%86400))+Date.parse(data.todo.Heure))-(new Date().valueOf());
					data.todo.class=(m<0)?"red":"blue";
					data.todo.Date=moment(new Date(data.todo.Date)).format('L');
					data.todo.Heure=moment(new Date(data.todo.Heure)).format('LT');
					$scope.$apply(function(){$scope.listetaches[index]=data.todo;});
						//alert(data);
				}
				index++;
				})
				
				})
          socket.on('ajoutTodo', function(data) {
				var todo = new tachesFactory(data.success);
					var m=((Date.parse(todo.Date)-(Date.parse(todo.Date)%86400))+Date.parse(todo.Heure))-(new Date().valueOf());
					todo.class=(m<0)?"red":"blue";
					todo.Date=moment(new Date(todo.Date)).format('L');
					todo.Heure=moment(new Date(todo.Heure)).format('LT');

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


