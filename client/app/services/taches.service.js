angular.module('moduletodo').factory(prefixe+'Factory', ['$resource',

	function($resource) {



		return $resource('/liste/:tskTodo', 
			{ tskTodo: '@_id'},
			{ update: {	method: 'PUT'}}
		);
	}

]);