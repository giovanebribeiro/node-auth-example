module.exports={
	'/':{
		controller:'IndexController',
		action:'index',
		/*method: 'GET', // Caso o método não esteja especificado, ele será automaticamente GET*/
	},

	'/users':{
		controller:'UsersController',
		action:'index',
	}
};


