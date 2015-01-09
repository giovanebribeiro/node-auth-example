module.exports={
	'/':{
		controller:'IndexController',
		action:'index',
		/*method: 'GET', // Caso o m�todo n�o esteja especificado, ele ser� automaticamente GET*/
	},

	'/users':{
		controller:'UsersController',
		action:'index',
	},

	'/signin':{
		controller:'LoginController',
		action:'signin',
	},

	'/signup':{
		controller:'LoginController',
		action:'signup',
	},
};


