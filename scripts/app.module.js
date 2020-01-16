var app = angular.module('myApp', ['ui.router','ui.utils.masks']);

app.run(function($rootScope, $location, $state, LoginService) {
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
      // console.log('Changed state to: ' + toState);
  	});

	if(!LoginService.isAuthenticated()) {
		$state.transitionTo('login');
	}

});