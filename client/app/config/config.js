angular
	.module('moduletodo')
	.config(function($stateProvider,$urlRouterProvider) {
	  $stateProvider.state({
		name: 'hello',
		url: '/hello',
		template: '<h3>Bienvenue WebDev</h3>'

	  });

	  $stateProvider.state({
		name: 'about',
		url: '/about',
		template: '<h3>Liste des todo!</h3>'
	  });
l.forEach(function(state){
	$stateProvider.state({
		name: prefixe+"_"+state.name,
		url: (!state.url?"/"+state.name+(state.id==""?"":"/"+state.id):state.url),
		templateUrl: "app/templates/"+prefixe+"_"+state.name+".html",
		controller: prefixe+"_"+state.name+"_Ctrl"
	})
});
  $urlRouterProvider.otherwise('/');
 // $locationProvider.html5Mode(true);
});
