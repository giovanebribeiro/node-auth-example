module.exports=function(app){
	var routes=require('../config/routes');
	var fs=require('fs');

	var controllers_folder=__dirname+'/../controllers';

	for(var k in routes){
		var route=routes[k];

		//separando a chave por espaços, para pegar o método 
		var url="";
		var method="";
		
		var k_array=k.split(/\s+/);
		if(k_array.length==1){
			url=k_array[0];
			method="get";
		}else if(k_array.length==2){
			method=k_array[0].toLowerCase();
			url=k_array[1];
		}else{
			throw new Error("Rotas "+k+" -> "+route+" não está seguindo o padrão");
		}

		//console.log('-------------------');
		//console.log(url);
		//console.log(method);
		
		var controller_filename=route.controller;
		var action_name=route.action;

		// carregando a rota
		var controller=require(controllers_folder+"/"+controller_filename+".js");
		app[method](url, controller[action_name]);
	}
};
