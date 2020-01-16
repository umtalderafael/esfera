
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'view/login.html',
        controller : 'LoginController',
        controllerAs: 'login'
      })
      .state('home', {
        url : '/home',
        templateUrl : 'view/home.html',
        controller : 'HomeController',
        controllerAs: 'home'
      })
      .state('cadastro', {
        url : '/cadastro',
        templateUrl : 'view/cadastro.html',
        controller : 'CadastroController',
        controllerAs: 'cadastro'
      })
      .state('perfil', {
        url : '/perfil',
        templateUrl : 'view/perfil.html',
        controller : 'PerfilController',
        controllerAs: 'perfil'
      })
      .state('editar', {
        url : '/editar',
        templateUrl : 'view/editar.html',
        controller : 'EditarController',
        controllerAs: 'editar'
      });            

      $urlRouterProvider.otherwise('/login');
      
  }]);
