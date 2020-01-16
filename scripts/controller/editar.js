app.controller('EditarController', function($scope, $rootScope, $stateParams, $state, LoginService, $anchorScroll, $location) {
	
    $location.hash('top');
      
    $anchorScroll();

	if(LoginService.isAuthenticated()) {
	  	$rootScope.$broadcast('TrocarBarra', 'logado');                            	        
	}
	else{
	  	$state.transitionTo('login');
	}
 
	var vm = this;

	var listaDeTelefones = [];

	var listaDeEmails = [];


    vm.arrayEmails = {
        emails: [] 
    };
    
    vm.adicionarEmail = function() {
    	vm.arrayEmails.emails.push({ email: '' });                       
    },
    vm.removerEmail = function(index) {
        if (vm.arrayEmails.emails.length == 1) alertaErro('Informe pelo menos um e-mail para continuar!');
        else vm.arrayEmails.emails.splice(index, 1);                    
    }



    vm.arrayTelefones = {
        telefones: []
    };
    
    vm.adicionarTelefone = function() {
    	vm.arrayTelefones.telefones.push({ telefone: '', tipo : ''  });                       
    },
    vm.removerTelefone = function(index) { 
        if (vm.arrayTelefones.telefones.length == 1) alertaErro('Informe pelo menos um telefone para continuar!'); 
        else vm.arrayTelefones.telefones.splice(index, 1);                    
    }



    vm.cancelar = function() {
    	localStorage.removeItem('editar');
    	$state.transitionTo('home');    	
    }



    vm.editarUsuario = function() {
    	

		if (vm.usuario.nome) {

			if (vm.usuario.nascimento) {
				 
				if (vm.usuario.cep) {

					if (vm.usuario.rua) {

						if (vm.usuario.numero) {


							// console.log(vm.usuario);


							vm.arrayEmails.emails.forEach(function(dados) {

								if (dados.email != '') {

									if (validateEmail(dados.email)) {

										var email = {'email' : dados.email};
										listaDeEmails.push(email);
										vm.usuario.emails = listaDeEmails;

										if (listaDeEmails.length > 0) {

											// console.log(vm.arrayTelefones.telefones);

											vm.arrayTelefones.telefones.forEach(function(dados) {

												// console.log(dados.telefone);

												
												if (dados.telefone != '') {

													if (validateTelefone(dados.telefone)) {
														
														var telefone = {'numero' : formatarTelefone(dados.telefone), 'tipo' : tipoTelefone(dados.telefone) };  
														listaDeTelefones.push(telefone);
														vm.usuario.telefones = listaDeTelefones; 
													}
													else {
														alertaErro('O telefone "' + dados.telefone + '" não é válido!');		 
													}							
												}
												else {
													alertaErro('O campo de telefone não pode ficar vazio!');		 
												}						
											});


											if (listaDeTelefones.length > 0) {

							 					// console.log(resposta.data.results[0].picture.medium);

												vm.usuarios = [];

												var listagem = localStorage.getItem('listagem');

												var array = listagem.split('$$$');

												for (var i = 0; i < array.length; i++) {				

													if (array[i] != '') {
														vm.usuarios.push( JSON.parse(array[i]) ); 
														// console.log(  JSON.parse(array[i]) );   
													}
												}

												var jsonUsuario = {
													"id": vm.usuarios.length,														
													"nome": vm.usuario.nome,													
													"nascimento": vm.usuario.nascimento,
													"avatar": vm.usuario.avatar, 
													"endereco": {
														"rua": vm.usuario.rua,
														"numero": vm.usuario.numero,
														"bairro": vm.usuario.bairro,
														"cidade": vm.usuario.cidade,
														"estado": vm.usuario.estado,
														"cep": vm.usuario.cep,
													},
													"telefones": vm.usuario.telefones,
													"emails": vm.usuario.emails
												};


												var indice = localStorage.getItem('editar');


												vm.usuarios[indice] = jsonUsuario; 
												// console.log( vm.usuarios ); 

												var listagem = '';

												for (var i = 0; i < vm.usuarios.length; i++) {

													// console.log( JSON.stringify(i) );
													// console.log( JSON.stringify(vm.usuarios[i]) );

													if (JSON.stringify(vm.usuarios[i]) != '') {
														listagem = listagem + JSON.stringify(vm.usuarios[i]) + '$$$'; 
													}															 
												}

												localStorage.setItem('listagem', listagem);
												$state.transitionTo('home');									 											

											}
											else {

												if (vm.arrayTelefones.telefones[0].telefone != '') {
													alertaErro('Informe pelo menos um telefone!');		  
												}											
											}	

										}
										else {
											alertaErro('Informe pelo menos um e-mail!');		 
										}
									}
									else {
										alertaErro('O e-mail "' + dados.email + '" não é válido!');		 
									}							
								}
								else {
									alertaErro('O campo e-mail não pode ficar vazio!');		
								}						
							});						 
						}
						else{
							alertaErro('Informe o número do endereço!');		
						}
					}
					else{
						alertaErro('Informe a Rua/Avenida do endereço!');		
					}
				}
				else{
					alertaErro('Informe o CEP do endereço!');		
				}
			}
			else{
				alertaErro('Informe  a data de nascimento!');		
			}
		}
		else{
			alertaErro('Informe o nome do usuário!');			
		}    	
    }





	vm.pesquisarCep = function(){

		// console.log(vm.usuario.cep);

		if (vm.usuario.cep) {

			if (vm.usuario.cep.length == 8) {

				$http.get("https://viacep.com.br/ws/" + vm.usuario.cep + "/json/").then(function(resposta) {
			       
					if (!("erro" in resposta.data)) { 

						// console.log(resposta.data);  

						vm.usuario.rua = resposta.data.logradouro;
						vm.usuario.bairro = resposta.data.bairro;
						vm.usuario.cidade = resposta.data.localidade;
						vm.usuario.estado = resposta.data.uf;

						$("#numero").focus();

						// $("#rua").val(dados.logradouro);
						// $("#bairro").val(dados.bairro);
						// $("#cidade-texto").val(dados.localidade);
						// $("#estado-texto").val(dados.uf);	   			 
					} 
					else {
						limparEndereco();
						// console.log('erro');  
						alertaErro('CEP não encontrado!');		
					} 
			    },
			    function(error) {
			    	limparEndereco();
			        // console.log(error);
			        alertaErro('CEP não encontrado!');		
			    });

			}
		}
	}

	function alertaErro(msg){

		$.confirm({
		    title: 'Atenção!',
		    content: msg,
		    theme: 'modern',
		    type: 'red',
		    icon: 'fas fa-exclamation-triangle',
		    buttons: {
		        ok: {
		            text: 'OK',
		            btnClass: 'btn-red',
		            keys: ['enter'],
		            action: function(){
		                
		            }
		        }
		    }
		});		
	}


	function formatarTelefone(v) {

	  var r = v.replace(/\D/g, "");
	  r = r.replace(/^0/, "");
	  if (r.length > 10) {
	    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
	  } else if (r.length > 5) {
	    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
	  } else if (r.length > 2) {
	    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
	  } else {
	    r = r.replace(/^(\d*)/, "($1");
	  }
	  return r;
	}

	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	function validateTelefone(telefone) {
		
		if (telefone.length == 10 || telefone.length == 11) {
			return true;
		}
		else {
			return false;
		}
	}

	function tipoTelefone(telefone) {
		
		if (telefone.length == 10) {
			return 'fixo'; 
		}
		else if (telefone.length == 11){
			return 'celular';
		}
	}

	function limparEndereco(){
		vm.usuario.rua = '';		
		vm.usuario.bairro = '';
		vm.usuario.cidade = '';
		vm.usuario.estdo = '';
	}

    function apenasNumeros(string) {         
        var numsStr = string.replace(/[^0-9]/g,'');
        return numsStr; 
    }


	if (validarStorage('editar')) {

		var indice = localStorage.getItem('editar');

		vm.usuarios = [];

		var listagem = localStorage.getItem('listagem');

		var array = listagem.split('$$$');

		for (var i = 0; i < array.length; i++) {				

			if (array[i] != '') {
				vm.usuarios.push( JSON.parse(array[i]) ); 
				// console.log(  JSON.parse(array[i]) );   
			}
		}

		var usuario = vm.usuarios[indice];
		console.log(usuario);

		vm.usuario = [];
		vm.usuario.nome = usuario.nome;
		vm.usuario.nascimento = usuario.nascimento;
		vm.usuario.avatar = usuario.avatar;
		vm.usuario.rua = usuario.endereco.rua;
		vm.usuario.numero = usuario.endereco.numero;
		vm.usuario.bairro = usuario.endereco.bairro;
		vm.usuario.cidade = usuario.endereco.cidade;
		vm.usuario.estado = usuario.endereco.estado;
		vm.usuario.cep = usuario.endereco.cep;

		usuario.emails.forEach(function(dados) { 
			// console.log(dados);
			var email = {'email': dados.email }; 
			vm.arrayEmails.emails.push(email);	 		  					 
		});

		usuario.telefones.forEach(function(dados) { 
			// console.log(dados);
			var telefone = {'tipo': dados.tipo, 'telefone': apenasNumeros(dados.numero)};   
			vm.arrayTelefones.telefones.push(telefone);			 					 
		});




	}


	 


});