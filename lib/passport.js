var User=require('../models/User');
var LocalStrategy=require('passport-local');
var TwitterStrategy=require('passport-twitter');
var config=require('../config/config');

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
		passReqToCallback: true
		}, function(req,email,password,done){
		// é recomendável que todo o procedimento seja feito de forma assíncrona
		process.nextTick(function(){
			/*
			 * Verificando se o usuário já está cadastrado
			 */
			User.findOne({'auth.local.email':email}, function(err,user){
				if(err) done(err);

				if(!req.user){
					// se o usuário existir, exibe uma mensagem de erro.
					if(user){
						return done(null, false, req.flash('signupMessage', 'Usuário já cadastrado.'));
					}else{
						// caso contrário, crie o novo usuário.
						var newUser=new User();
						newUser.auth.local.email=email;
						newUser.auth.local.password=newUser.generateHash(password); // a senha deve ser encriptada antes da gravação no banco.
	
						newUser.save(function(err){
							if(err) throw err;
	
							return done(null, newUser, req.flash('signupMessage', 'Usuário cadastrado com sucesso.'));
						});
					}
				}else{
					//atualizar o usuário com os dados novos.
					var _user=req.user;
					_user.auth.local.email=email;
					_user.auth.local.password=_user.generateHash(password);

					_user.save(function(err){
						if(err) throw err;

						return done(null, _user, req.flash('signupMessage', 'Usuário atualizado.'));
					});
				}
			});
		});
	})); // fim da estratégia para o signup.

	passport.use('local-signin', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req,email,password,done){
		User.findOne({'auth.local.email':email}, function(err,user){
			if(err) return done(err);

			if(!user) return done(null, false, req.flash('signinMessage', 'Usuário não encontrado'));

			if(!user.checkPassword(password)) return done(null, false, req.flash('signinMessage', 'Senha incorreta'));

			return done(null, user);
		});
	}));

	passport.use(new TwitterStrategy({
		consumerKey: config.secret.twitter.consumer_key,
		consumerSecret: config.secret.twitter.consumer_secret,
		callbackURL: config.secret.twitter.callback_url,
	}, function(token, tokenSecret, profile, done){
		process.nextTick(function(){
			console.log(profile);
			User.findOne({'auth.twitter.id':profile.id}, function(err, user){
				if(err) return done(err);

				if(user){
					return done(null, user);
				}else{
					var newUser=new User();
					newUser.auth.twitter.id=profile.id;
					newUser.auth.twitter.token=profile.token;
					newUser.auth.twitter.username=profile.username;
					newUser.auth.twitter.displayName=profile.displayName;

					newUser.save(function(err){
						if(err) throw err;

						return done(null, newUser)
					});
				}
			});
		});
	}));
};
