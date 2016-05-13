/*****************************************************************************************************************************************************************************
                                 THIS IS THE SERVER SIDE CONTROLLER FOR THE USER INFORMATION PAGE
*******************************************************************************************************************************************************************************/


var User = require('../datasets/users');
var Message = require('../datasets/messages.js');

/********************************************************************************************************
                     FUNCTION TO GET ALL THE INFORMATION 
*********************************************************************************************************/
module.exports.getAllInformation= function(req,res){
var userId = req.body.userId;
User.findById(userId,function(err,allData){
	if(err){
		console.log(err);
	}
	else{
		
		res.json(allData);
	}
})

}
/************************************** END OF THE ALL INFORMATION ****************************************/


/*********************************************************************************************************
                    FUNCTION TO POST THE MESSAGE 
************************************************************************************************************/ 
//for posting the message
module.exports.postMessage = function(req,res){
	var recieverImage="";
	var recieverUsername="";
	User.findById(req.body.recieverUserId,function(err,allData){
               if(err){
               	res.json(err);
               }else{
             
               	recieverImage=allData.image;
               	recieverUsername=allData.username;
               	var message= new Message(); 
	message.recieverId= req.body.recieverUserId;
	message.senderId = req.body.senderUserId;
	message.message= req.body.message;
	message.senderImage=req.body.image;
	message.senderUsername=req.body.username;
	message.recieverUsername=recieverUsername;
	message.recieverImage=recieverImage;
	message.counter=req.body.counter+1;
	message.save();
	res.json("yes");
               }
	})


}

/************************************* END OF THE POST MESSAGE ****************************************************/