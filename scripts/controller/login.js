
  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    
     $scope.username = '';
     $scope.password = '';


  if(LoginService.isAuthenticated()) {
        $rootScope.$broadcast('TrocarBarra', 'logado');                            
        $rootScope.$broadcast('TrocarPagina', 'home');  
  }

  $scope.esconderErros = function() {
    $scope.error = "";
   }

    $scope.formSubmit = function() {

        if ($scope.username) {

          if ($scope.password) {

            if(LoginService.login($scope.username, $scope.password)) {

                  $scope.error = '';
                  $scope.username = '';
                  $scope.password = '';

                  var usuario = {
                    'nome' : 'Rafael Carvalho',
                    'email' : 'umtalderafael@hotmail.com',
                    'telefone' : '(17) 98224-5938',
                    'imagem' : 'https://1.bp.blogspot.com/-DufH32BOIEk/XCk5hFLGLZI/AAAAAAAAP1o/BG3AKy9KUlwDXBUwDrQ9n8fvS5-JOqLPQCLcBGAs/s200/2TO_i_3S_400x400.jpg'
                  };

                  criarStorage('usuario', JSON.stringify(usuario));

                  $rootScope.$broadcast('TrocarBarra', 'logado');                            
                  $rootScope.$broadcast('TrocarPagina', 'home');  

                  // $state.transitionTo('home');

            } else {
              $scope.error = "Dados de usuário incorretos!";
            }   

          }
          else{
            $scope.error = "Informe sua senha!";
          }
        }
        else {
          $scope.error = "Informe seu usuário!";
        }

    };
    
  }); 

 