  app.factory('LoginService', function() {

    var admin = 'admin';
    var pass = 'pass';


    if (validarStorage('usuario')) {


        var isAuthenticated = true;
  
    }
    else {
        
        var isAuthenticated = false;
        
    }  
    
    return {
      login : function(username, password) {

        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;

      },
      logout : function(username, password) {
        isAuthenticated = false;
        return isAuthenticated;
      },

      isAuthenticated : function() {

        return isAuthenticated;
        
      }
    };
    
  });