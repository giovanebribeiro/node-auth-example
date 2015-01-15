module.exports={
	// Caso o método da rota seja diferente de GET, utilizar o nome do método antes da rota (Ex: 'POST /nome/nome2')
	'/':{
		controller:'IndexController',
		action:'index',
	},


	'/local/signin':{
		controller:'LoginController',
		action:'signin',
	},

	'/local/signup':{
		controller:'LoginController',
		action:'signup',
	},

	'POST /local/signup':{
		controller:'LoginController',
		action:'cadastroUsuario',
	},

	'POST /local/signin':{
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

	'/twitter/connect':{
		controller:'LoginController',
		action:'twitterConnect',
	},

	'/twitter/callback':{
		controller:'LoginController',
		action:'twitterCallback',
	},

	'/local/link':{
		controller:'LoginController',
		action:'localLink',
		policy:'isAuthenticated',
	},

	'POST /local/link':{
		controller:'LoginController',
		action:'linkAccount',
		policy:'isAuthenticated',
	},

	'/local/unlink':{
		controller:'LoginController',
		action:'unlinkAccount',
		policy:'isAuthenticated',
	},

	'/twitter/link':{
		controller:'LoginController',
		action:'twitterLink',
		policy:'isAuthenticated',
	},

	'/twitter/unlink':{
		controller:'LoginController',
		action:'twitterUnlink',
		policy:'isAuthenticated',
	},
};


