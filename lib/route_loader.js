module.exports=function(app){
	var routes=require('../config/routes');
	var fs=require('fs');

	var controllers_folder=__dirname+'/../controllers';

	for(var k in routes){
		var route=routes[k];

		var url=k;
		var controller_filename=route.controller;
		var action_name=route.action;
		var method=(route.method)? route.method.toLowerCase() : 'get';

		// carregando a rota
		var controller=require(controllers_folder+"/"+controller_filename+".js");
		app[method](url, controller[action_name]);
	}
};
