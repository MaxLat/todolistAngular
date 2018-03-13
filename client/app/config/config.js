angular
	.module('moduletest')
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
//////////////////////::
// $stateProvider.state({
//
//    name: 'membres_liste',
//
//    url: '/',
//
//    templateUrl: 'app/templates/membres_liste.html',
//
//    controller  : 'membres_liste_Ctrl'
//
//  });
//
//  // Route pour afficher un profil
//  $stateProvider.state({
//
//    name: 'membres_profil',
//
//    url: '/membres_profil/:id',
//
//    templateUrl: 'app/templates/membres_profil.html',
//
//    controller  : 'membres_profil_Ctrl'
//
//  });
//  // Route pour ajouter un profil
//  $stateProvider.state({
//    name: 'membres_profil_ajouter',
//    url: '/membres_profil_ajouter',
//    templateUrl: 'app/templates/membres_profil_ajouter.html',
//    controller  : 'membres_profil__ajouter_Ctrl'
//  });
//
//  // Route pour editer un profil
//  $stateProvider.state({
//    name: 'membres_profil_edit',
//    url: '/membres_profil_edit/:id',
//    templateUrl: 'app/templates/membres_profil_edit.html',
//    controller  : 'membres_profil_edit_Ctrl'
//    
//  });

////////////////////////



////////////////////////
//var titi= new function() {
//this.l=[{name:'liste',id:''},{name:'profil',id:':id'},{name:'profil_add',id:''},{name:'profil_edit',id:':id'}];
//this.l.forEach(function(item){
//	item.params={
//    name: "membres_"+item.name,
//    url: "/"+item.name+(item.id==""?"":"/"+item.id),
//    templateUrl: "app/templates/membres_"+item.name+".html",
//    controller: "membres_"+item.name+"_Ctrl"
//  } }
//)
//}  
//  $urlRouterProvider.otherwise('/');
// // $locationProvider.html5Mode(true);
//});