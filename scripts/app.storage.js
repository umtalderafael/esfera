  
	function criarStorage(nome, dados) {
		var encrypted = CryptoJS.AES.encrypt( JSON.stringify(dados, null, 2) , "fnm");
		localStorage.setItem(nome, encrypted );  
	}
 

 	function pegarStorage(nome) {
 		var dados =  localStorage.getItem(nome) ; 
 		var decrypted = CryptoJS.AES.decrypt(dados, "fnm");
 		var string = decrypted.toString(CryptoJS.enc.Utf8);  
 		// console.log(string); 
 		// console.log(typeof string); 
 		return  JSON.parse(string);   
	}

	function validarStorage(nome) { 
		var dados =  localStorage.getItem(nome) ; 
		if (dados != null) {
			if (dados != 'null') return true;
			else return false;		
		}
		else{
			return false;
		}
	}