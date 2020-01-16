app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {

	var vm = this;

	$('.listagem').hide();  
	$('.nenhum').hide();  
	$('.carregando').show();


	vm.excluir = function(index) {

		console.log(index);
		vm.usuarios.splice(index, 1);

		var listagem = '';

		for (var i = 0; i < vm.usuarios.length; i++) {

			// console.log( JSON.stringify(i) );
			// console.log( JSON.stringify(vm.usuarios[i]) );

			if (JSON.stringify(vm.usuarios[i]) != '') {
				listagem = listagem + JSON.stringify(vm.usuarios[i]) + '$$$'; 
			}				
		 
		}

		localStorage.setItem('listagem', listagem);

		if (vm.usuarios.length == 0) {
			$('.listagem').hide();  
			$('.nenhum').show();
		}

	}



    vm.editar = function(index) {
        localStorage.setItem('editar', index); 
        $state.transitionTo('editar');
    } 



	function carregarUsuarios(){

		// console.log(validarStorage('listagem'));

		if (validarStorage('listagem')) {

			vm.usuarios = [];

			var listagem = localStorage.getItem('listagem');

			var array = listagem.split('$$$');

			for (var i = 0; i < array.length; i++) {				

				if (array[i] != '') {
					vm.usuarios.push( JSON.parse(array[i]) ); 
					// console.log(  JSON.parse(array[i]) );   
				}
			}

			if (vm.usuarios.length == 0) {
				$('.listagem').hide();  
				$('.carregando').hide();  
				$('.nenhum').show();
			}		
			else {

				setTimeout(function(){ 
					
					$('.carregando').hide();  
					$('.listagem').show('fast');

				}, 2000);				

			}	



		}
		else{

			vm.usuarios = [{
				"id": 1,				
				"nome": "George Bluth",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "São José do Rio Preto",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "george@gmail.com"
				}, {
					"email": "office@hotmail.com"
				}]
			}, {
				"id": 2,				
				"nome": "Janet Weaver",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "Agudos",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "deyxestar@gmail.com"
				}, {
					"email": "umtalderafael@hotmail.com"
				}]				
			}, {
				"id": 3,				
				"nome": "Emma Wong",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "São José do Rio Preto",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "deyxestar@gmail.com"
				}, {
					"email": "umtalderafael@hotmail.com"
				}]				
			}, {
				"id": 4,				
				"nome": "Eve Holt",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "Cedral",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "deyxestar@gmail.com"
				}, {
					"email": "umtalderafael@hotmail.com"
				}]				

			}, {
				"id": 5,				
				"nome": "Charles Morris",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "São José do Rio Preto",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "yyyyyy@gmail.com"
				}, {
					"email": "ffffffff@hotmail.com"
				}]				
			}, {
				"id": 6,				
				"nome": "Tracey Ramos",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "Mirassol",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "deyxestar@gmail.com"
				}, {
					"email": "umtalderafael@hotmail.com"
				}]				
			}, {
				"id": 7,				
				"nome": "Michael Lawson",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "São José do Rio Preto",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "deyxestar@gmail.com"
				}, {
					"email": "umtalderafael@hotmail.com"
				}]				
			}, {
				"id": 8,				
				"nome": "Lindsay Ferguson",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "São José do Rio Preto",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982252211"
				}, {
					"tipo": "telefone",
					"numero": "1766552211"
				}],
				"emails": [{
					"email": "deyxestar@gmail.com"
				}, {
					"email": "umtalderafael@hotmail.com"
				}]				
			}, {
				"id": 9,				
				"nome": "Tobias Funke",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "Osasco",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "deyxestar@gmail.com"
				}, {
					"email": "umtalderafael@hotmail.com"
				}]				
			}, {
				"id": 10,				
				"nome": "Byron Fields",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "São José do Rio Preto",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17982245938"
				}, {
					"tipo": "telefone",
					"numero": "1732336906"
				}],
				"emails": [{
					"email": "deyxestar@gmail.com"
				}, {
					"email": "umtalderafael@hotmail.com"
				}]				
			}, {
				"id": 11,				
				"nome": "George Edwards",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "Franca - SP",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17988554411"
				}],
				"emails": [{
					"email": "aaaaaa@gmail.com"
				}, {
					"email": "bbbbbbb@hotmail.com"
				}]				
			}, {
				"id": 12,				
				"nome": "Rachel Howell",				
				"nascimento": "01/01/1980",
				"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg",
				"endereco": {
					"rua": "Rua José Vieira Farias",
					"numero": "182",
					"bairro": "Nova Fraternidade 2",
					"cidade": "São José do Rio Preto",
					"estado": "SP",
					"cep": "15000-000"
				},
				"telefones": [{
					"tipo": "celular",
					"numero": "17983345955"
				}, {
					"tipo": "telefone",
					"numero": "1733221155"
				}],
				"emails": [{
					"email": "rachel@gmail.com"
				}]				
			}];

			var listagem = '';

			for (var i = 0; i < vm.usuarios.length; i++) {

				// console.log( JSON.stringify(i) );
				// console.log( JSON.stringify(vm.usuarios[i]) );

				if (JSON.stringify(vm.usuarios[i]) != '') {
					listagem = listagem + JSON.stringify(vm.usuarios[i]) + '$$$'; 
				}				
			 
			}

			localStorage.setItem('listagem', listagem);

			setTimeout(function(){ 
				
				$('.carregando').hide();  
				$('.listagem').show('fast');

			}, 2000);

		}
	}

	if(!LoginService.isAuthenticated()) {
		$state.transitionTo('login');
	}
	else{
		carregarUsuarios();
	}	

	// console.log(vm.usuarios);
	 
});