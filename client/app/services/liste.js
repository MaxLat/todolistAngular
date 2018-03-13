angular.module('moduletest')
	.service('listeService', function($http) {
	  var service = {
		getListe: function() {
		  return $http.get('/liste', { cache: true }).then(function(resp) {
			return resp.data.sort(function(a, b){
							var x=a.Nom.toLowerCase(),
								y=b.Nom.toLowerCase();
							return x<y ? -1 : x>y ? 1 : 0;
						});
		  });
		},
		
		getProfil: function(id) {
		  function profilFind(profil) {
			return profil._id === id;
		  }
		  
		  return service.getListe().then(function (membres) {
			return membres.find(profilFind)
		  });
		},
		delProfil: function(id) {
		  return $http.post('/suprListe/'+id, { cache: true }).then(function(resp) {
			return resp.data.sort(function(a, b){
							var x=a.Nom.toLowerCase(),
								y=b.Nom.toLowerCase();
							return x<y ? -1 : x>y ? 1 : 0;
						});
		  });
		},
		updateProfil: function(id) {
		  return $http.post('/ajoutListe/'+id,
					{ 	cache: true ,
						headers: {'Content-type': 'application/json'}, 
						data:   JSON.stringify(service.getProfil(id))
					}				
					).then(function(resp) {
							return resp.data.sort(function(a, b){
										var x=a.Nom.toLowerCase(),
											y=b.Nom.toLowerCase();
										return x<y ? -1 : x>y ? 1 : 0;
									});
		  });
		}
	  }
	  
	  return service;
	})
