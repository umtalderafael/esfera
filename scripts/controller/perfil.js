app.controller('PerfilController', function($scope, $rootScope, $stateParams, $state, LoginService) {
	

	if(LoginService.isAuthenticated()) {
	  	$rootScope.$broadcast('TrocarBarra', 'logado');                            	        
	}
	else{
	  	$state.transitionTo('login');
	}


	
	var vm = this;

	var usuario = JSON.parse(pegarStorage('usuario'));
	// console.log(usuario);

	vm.usuario = [];

	vm.usuario.nome = usuario.nome;
	vm.usuario.email = usuario.email;
	vm.usuario.telefone = usuario.telefone;
	vm.usuario.imagem = usuario.imagem;
	
});