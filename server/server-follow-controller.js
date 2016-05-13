/********************************************************************************************************************************************************************************
                                                    THIS IS THE SERVER SIDE CONTROLLER FOR THE FOLLOW CONTROLLER
**********************************************************************************************************************************************************************************/

var User = require('../datasets/users');
var Message= require('../datasets/messages');

/*******************************************************************************
               FUNCTION TO GET THE USER INFO
*********************************************************************************/
module.exports.getUsers=function(req,res){
	User.find({})
	.sort({date:-1})
	.exec(function(err,allData){
		if(err){
			res.json(err);
		}else{
			res.json(allData);
		}
	})
};

/**************************** END OF THE USERINFO FUNCTION *********************/

var otherUsername="";

/*******************************************************************************
            FUNCTION POSTFOLLOW IS USED TO FOLLOW A USER
*********************************************************************************/

module.exports.postFollow = function(req,res){
	var  currentUserId = req.body.currentUserId;
	var  otherUserId = req.body.otherUserId;
	var  currentUsername =req.body.currentUsername;
	var usersUsername = req.body.usersUsername;
	var currentUserImage=req.body.currentUserImage;
	var usersImage=req.body.usersImage;
	var counter=req.body.counter;
	
User.findById(otherUserId,function(err,otherUser){
		if(err){
			console.log(err);
		}else{
			otherUser.followers.push({userId:currentUserId,username:currentUsername,followersImage:currentUserImage,counter:counter});
			otherUser.save();
			
					
		}
	});
	User.findById(currentUserId,function(err,currentUser){
		if(err){
			console.log(err);
		}else{
			currentUser.following.push({userId:otherUserId,username:usersUsername,followingImage:usersImage});
           	currentUser.save();
			res.json(currentUser);

		}
	});

	
}
/************************************************* END OF THE FOLLOW USER ***********************************/

/************************************************************************************************************
                               FUNCTION TO UNFOLLOW A USER 
*************************************************************************************************************/

//This is to unfollow a user present in the following list

module.exports.unfollowUser = function(req,res){
	var currentUserId = req.body.currentUserId;
	var otherUserId = req.body.otherUserId;
	User.findById(currentUserId,function(err,allData){
		if(err){
			console.log(err);
		}else{
		allData.following.pop({userId:otherUserId});
		allData.save();
		res.json(allData);

	}
});
}

/**************************** END OF THE  UNFOLLOW USER ***************************************************/

/*********************************************************************************************************
                 FUNCTION TO GET THE FOLLOW NOTIFICATION 
***********************************************************************************************************/
//This is used to get the notification of the users follow
module.exports.getFollowNoti=function(req,res)
{
	var userId=req.body.userId;
	var tot=0;
	User.findById(userId,function(err,allData){
		if(err){
			console.log(err);
		}else{
			
		for(var i=0,len=allData.followers.length;i<len;i++){
			 if(allData.followers[i].counter!==undefined)
			 tot=tot+allData.followers[i].counter;

		}
		res.json({tot,allData});
	}
	})
};
/*********************************** END OF THE FOLLOW NOTIFICATION ***************************************/

/*********************************************************************************************************
                       FUNCTION TO UNSET THE FOLLOW NOTIFICATION
***********************************************************************************************************/
//This is used to unset the notification for the users
 
 module.exports.unsetFollowNoti=function(req,res){
 	var userId=req.body.userId;
 	User.findById(userId,function(err,allData){
 		if(err){
 			console.log(err);
 		}else{
 			for(var i=0,len=allData.followers.length;i<len;i++){
 				if(allData.followers[i].counter!==undefined)
 					allData.followers[i].counter=0;

 			}
 			allData.save();
 		}
 	})
 };

 /*************************** END OF THE UNFOLLOW NOTIFICATION *********************************************/