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
		failureRedirect: '/signup', // Em caso de falha, redirecione para esta rota
		failureFlash: true, //allow flash message
	}),

	login:passport.authenticate('local-signin',{
		successRedirect:'/dashboard',
		failureRedirect:'/signin',
		failureFlash: true
	}),

	signout: function(req,res){
		req.logout(); // já fornecida pelo passport
		res.redirect('/'); // redireciona para a raiz.
	},
};

module.exports=LoginController;
