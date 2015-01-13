module.exports={
	// Caso o m�todo da rota seja diferente de GET, utilizar o nome do m�todo antes da rota (Ex: 'POST /nome/nome2')
	'/':{
		controller:'IndexController',
		action:'index',
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

	'POST /signup':{
		controller:'LoginController',
		action:'cadastroUsuario',
	},

	'POST /signin':{
		controller:'LoginController',
		action:'login',
	},

	'/dashboard':{
		controller:'DashboardController',
		action:'index',
		policy:'isAuthenticated',
	},

	'/signout':{
		controller:'LoginController',
		action:'signout',
		policy:'isAuthenticated',
	},
};


