var User=require('../models/User');
var LocalStrategy=require('passport-local');

module.exports=function(passport){
	/*
	 * Estas configura��es permitem o login consistente e permamente
	 */
	passport.serializeUser(function(user,done){
		done(null,user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err,user);
		});
	});

	// Setup do m�dulo passport-local, que � chamado de estrat�gia. Como o passport suporta v�rios 
	// tipos de configura��es e abordagens diferentes, � recomend�vel nomear as estrat�gias.
	// Para a estrat�gia local, utilizaremos os nomes 'local-signup' e 'local-signin'
	
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
		}, function(req,email,password,done){
		// � recomend�vel que todo o procedimento seja feito de forma ass�ncrona
		process.nextTick(function(){
			/*
			 * Verificando se o usu�rio j� est� cadastrado
			 */
			User.findOne({'auth.local.email':email}, function(err,user){
				if(err) done(err);

				// se o usu�rio existir, exibe uma mensagem de erro.
				if(user){
					return done(null, false, req.flash('signupMessage', 'Usu�rio j� cadastrado.'));
				}else{
					// caso contr�rio, crie o novo usu�rio.
					var newUser=new User();
					newUser.auth.local.email=email;
					newUser.auth.local.password=newUser.generateHash(password); // a senha deve ser encriptada antes da grava��o no banco.

					newUser.save(function(err){
						if(err) throw err;

						return done(null, newUser, req.flash('signupMessage', 'Usu�rio cadastrado com sucesso.'));
					});
				}
			});
		});
	})); // fim da estrat�gia para o signup.

	passport.use('local-signin', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req,email,password,done){
		User.findOne({'auth.local.email':email}, function(err,user){
			if(err) return done(err);

			if(!user) return done(null, false, req.flash('signinMessage', 'Usu�rio n�o encontrado'));

			if(!user.checkPassword(password)) return done(null, false, req.flash('signinMessage', 'Senha incorreta'));

			return done(null, user);
		});
	}));
};
