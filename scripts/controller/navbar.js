
app.controller('NavbarCtrl', function($scope, $rootScope, $stateParams, $state, LoginService) {

    var self = this;
    
    $('.barra-logado').hide(); 
    $('#btn-carregando-logout').hide(); 

	self.abrirLink = function(link) {        
		$state.transitionTo(link);		
	}
    
    self.logout = function() {             
        $('.barra-logado').hide();
        localStorage.clear();
        LoginService.logout();
        $state.transitionTo('login');
    }

    $scope.$on("TrocarBarra", function(elemento, valor){

        if (valor == 'logado') {            
            $('.barra-logado').show();
        }
        else {            
            $('.barra-logado').hide();            
        } 
    });

    $scope.$on("TrocarPagina", function(elemento, valor){ 
    	self.abrirLink(valor); 
    });

    // console.log(location.hash);
	if (location.hash == '#/home') {  

		if (validarStorage('usuario')) {
            $('.barra-logado').show();
			self.abrirLink('home');
		}
		else {            
            $('.barra-logado').hide();     
			self.abrirLink('login');
		}		
	}

});
