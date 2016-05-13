/*********************************************************************************************************************************************************************************
                                               THIS IS TH SERVER SIDE CONTROLLER FOR THE DETAIL CONTROLLER WHICH WAS NOT IN USE SORRY
***********************************************************************************************************************************************************************************/

var User = require('../datasets/users');

 	 

module.exports.getUser = function(req,res){
	userId = req.body.userId;
	User.findById(userId,function(err,userData){
		var user= userData;
		if(err){
			res.json(err);
		}else{
		res.json(userData);
	}
	})
};

module.exports.getAllUser=function(req,res){
	User.find({},function(err,userData){
		if(err){
			res.json(err);
		}
		else{
			res.json(userData);
		}
	})
};