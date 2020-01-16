app.controller('CadastroController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {

	if(LoginService.isAuthenticated()) {
	  	$rootScope.$broadcast('TrocarBarra', 'logado');                            	        
	}
	else{
	  	$state.transitionTo('login');
	}
 
	var vm = this;

	vm.usuario = [];
	// vm.usuario.nome = '';
	// vm.usuario.data = new Date(); 
	// vm.usuario.rua = 'Rua Ca';
	// vm.usuario.numero = '630';
	// vm.usuario.bairro = 'Bom Jesus';
	// vm.usuario.cidade = 'São Paulo';
	// vm.usuario.estado = 'SP';
	// vm.usuario.cep = '15014-200';

	var listaDeTelefones = [];

	var listaDeEmails = [];


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



	vm.cadastrar = function() {

		if (vm.usuario.nome) {

			if (vm.usuario.data) {
				
				var d = new Date(vm.usuario.data);

				// console.log(d.getDate()) ; 
				// console.log(d.getMonth()+1) ; 
				// console.log(d.getFullYear() ) ; 

				var dia = d.getDate();
				var mes = d.getMonth()+1;
				var ano = d.getFullYear();

				vm.usuario.nascimento = dia + '/' + mes + '/' + ano;

				if (vm.usuario.cep) {
					if (vm.usuario.rua) {
						if (vm.usuario.numero) {

							vm.arrayEmails.emails.forEach(function(dados) {

								if (dados.email != '') {

									if (validateEmail(dados.email)) {

										var email = {'email' : dados.email};

										console.log(email);

										listaDeEmails.push(email);
										vm.usuario.emails = listaDeEmails;

										if (listaDeEmails.length > 0) {

											vm.arrayTelefones.telefones.forEach(function(dados) {
												
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


												$http.get('https://randomuser.me/api/').then(function(resposta) {

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
														"avatar": resposta.data.results[0].picture.medium,
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



													vm.usuarios.push( jsonUsuario ); 

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
 
											    },
											    function(error) {
											     
											        console.log(error);
									 	
											    });												

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
							// console.log(vm.usuario);
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





    vm.arrayEmails = {
        emails: [{ email: '' }]  
    };
    
    vm.adicionarEmail = function() {
    	vm.arrayEmails.emails.push({ email: '' });                       
    },
    vm.removerEmail = function(index) {
        if (vm.arrayEmails.emails.length == 1) alertaErro('Informe pelo menos um e-mail para continuar!');
        else vm.arrayEmails.emails.splice(index, 1);                    
    }



    vm.arrayTelefones = {
        telefones: [{ telefone: '', tipo : '' }]
    };
    
    vm.adicionarTelefone = function() {
    	vm.arrayTelefones.telefones.push({ telefone: '', tipo : ''  });                       
    },
    vm.removerTelefone = function(index) { 
        if (vm.arrayTelefones.telefones.length == 1) alertaErro('Informe pelo menos um telefone para continuar!'); 
        else vm.arrayTelefones.telefones.splice(index, 1);                    
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


}); 