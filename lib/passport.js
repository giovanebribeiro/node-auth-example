var User=require('../models/User');
var LocalStrategy=require('passport-local');

module.exports=function(passport){
	/*
	 * Estas configurações permitem o login consistente e permamente
	 */
	passport.serializeUser(function(user,done){
		done(null,user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err,user);
		});
	});

	// Setup do módulo passport-local, que é chamado de estratégia. Como o passport suporta vários 
	// tipos de configurações e abordagens diferentes, é recomendável nomear as estratégias.
	// Para a estratégia local, utilizaremos os nomes 'local-signup' e 'local-signin'
	
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email', 
		passwordField: 'password',
		passReqToCallback: true // permite passar a requisição inteira no callback
	}), function(req,email,pasword,done){
		// é recomendável que todo o procedimento seja feito de forma assíncrona
		process.nextTick(function(){
			/*
			 * Verificando se o usuário já está cadastrado
			 */
			User.findOne({'auth.local.email':email}, function(err,user){
				if(err) done(err);

				// se o usuário existir, exibe uma mensagem de erro.
				if(user){
					return done(null, false, req.flash('signupMessage', 'Este e-mail já está sendo utilizado.'));
				}else{
					// caso contrário, crie o novo usuário.
					var newUser=new User();
					newUser.auth.local.email=email;
					newUser.auth.local.password=newUser.generateHash(password); // a senha deve ser encriptada antes da gravação no banco.

					newUser.save(function(err){
						if(err) throw err;

						return done(null, newUser, true, req.flash('signupMessage', 'Usuário cadastrado com sucesso.'));
					});
				}
			});
		});
	}); // fim da estratégia para o signup.
};
