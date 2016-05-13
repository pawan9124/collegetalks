/********************************************************************************************************************************************************************************
                 THIS IS THE SERVER SIDE FUNCTION TO AUTHENTICATE THE USE LOGIN 
**********************************************************************************************************************************************************************************/

var User = require('../datasets/users.js');//GET THE SHCEMA DETAIL OF THE USER

/****************************************************************************************
                       FUNCTION FOR THE LOGIN  OR AUTHENTICATION
*****************************************************************************************/
module.exports.login= function(req,res){
	User.find(req.body,function(err,results){
		

		if(err)
		{
			console.log(err);
			

		}
		if(results.length==0){
			res.json(false);
		}
		if(results && results.length >=1)
		{
			var userData = results[0];

			res.json({
				email:userData.email,
				_id:userData._id,
				username:userData.username,
				image:userData.image,
				following:userData.following,
				followers:userData.followers

			});
		}
	})
	
}
/*************************************END OF THE LOGIN OR AUTHENTICATION ****************************/