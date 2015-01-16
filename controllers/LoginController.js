var passport=require('passport');

var LoginController={
	signin:function(req,res){
		res.render('signin',{ message: req.flash('signinMessage') });
	},

	signup:function(req,res){
		res.render('signup', { message: req.flash('signupMessage') });
	},

	cadastroUsuario:passport.authenticate('local-signup',{
		successRedirect: '/dashboard', // em caso de sucesso, redirecione para esta rota.
		failureRedirect: '/local/signup', // Em caso de falha, redirecione para esta rota
		failureFlash: true, //allow flash message
	}),

	login:passport.authenticate('local-signin',{
		successRedirect:'/dashboard',
		failureRedirect:'/local/signin',
		failureFlash: true
	}),

	signout: function(req,res){
		req.logout(); // já fornecida pelo passport
		res.redirect('/'); // redireciona para a raiz.
	},

	twitterConnect: passport.authenticate('twitter'),

	twitterCallback: passport.authenticate('twitter', {
		successRedirect: '/dashboard',
		failureRedirect: '/',
	}),
	
	localLink:function(req,res){
		res.render('addAccount');
	},
	
	linkAccount:passport.authenticate('local-signup',{
		successRedirect:'/dashboard',
		failureRedirect:'/local/link',
	}),
	
	unlinkAccount:function(req,res){
		var _user=req.user;
		_user.auth.local.email=undefined;
		_user.save(function(err){
			if(err) throw err;
			
			res.redirect('/dashboard');
		});
	},
	
	linkTwitter:passport.authorize('twitter', {scope: 'email'}),
	
	linkTwitterCallback:passport.authorize('twitter', {
		successRedirect:'/dashboard',
		failureRedirect:'/',
	}),
	
	unlinkTwitter:function(req,res){
		var _user=req.user;
		
		_user.auth.twitter.id=undefined;
		_user.save(function(err){
			if(err) throw err;
			
			res.redirect('/dashboard');
		});
	},
};

module.exports=LoginController;