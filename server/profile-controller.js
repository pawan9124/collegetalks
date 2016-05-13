/****************************************************************************************************************************************************************
                            THIS IS THE SERVER SIDE CONTROLLER FOR THE SIGNUP PAGE
*****************************************************************************************************************************************************************/

var User = require('../datasets/users.js');//THIS IS THE SCHEMA FOR THE USER POSTS


/*************************************************************************************
                          THIS IS THE FUNCTION FOR THE SIGNUP
**************************************************************************************/
module.exports.signup=function(req,res){
   var email=req.body.email;
   var password=req.body.password;
   var username=req.body.username;
   var number="";
   User.find({email:email},function(err,allData){
     if(allData.length>=1)
     {
        number=1;
     	res.json(1);
     }
     else
     {
     	var user = new User();
	user.email=email;
	user.password=password;
	user.username=username;
	user.save();
	number=2
	res.json(2);

     }

   })
	

}
/********************************** END OF THE SIGNUP FUNCTION*****************************/