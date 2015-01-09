var LoginController={
	signin:function(req,res){
		res.render('signin');
	},

	signup:function(req,res){
		res.render('signup');
	},
};

module.exports=LoginController;
