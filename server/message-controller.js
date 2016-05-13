/**********************************************************************************************************************************************************************
                                                THIS IS THE SERVER SIDE CONTROLLER FOR THE MESSAGES AS TO GET AND SEND MESSAGES
************************************************************************************************************************************************************************/

var Message = require('../datasets/messages.js');//VARIABLE SCHEMA FOR GET THE SCHEMA FOR THE DATA


/*************************************************************************************************
             FUNCTION TO GET THE MESSAGES FROM THE DATABASE
*************************************************************************************************/
module.exports.getMessages = function(req,res)
{
	var userId=req.body.userId;
	Message.find({recieverId:userId})
	.sort({date:-1})
	.exec(function(err,allData){
		if(err){
			res.error(err);

		}
		else{
			res.json(allData);
			
		}
	})
}

/**************************************END OF THE GET MESSAGES FUNCTION ****************************/

/***************************************************************************************************
                 FUNCTION TO POST A REPLY TO A MESSAGE
****************************************************************************************************/
module.exports.postReply = function(req,res){
	var messageId = req.body.messageId;
	var content = req.body.contents;
	var userId= req.body.userId;
	var userImage=req.body.userImage;
	var username=req.body.username;
	var counters= req.body.counters;
	
    Message.findById(messageId,function(err,allData){
       		       	               
            	if(err){
            		res.json(err);
            	}else{
            		allData.reply.push({replyerId:userId,contents:content,replyerImage:userImage,replyerUsername:username,receiverCounter:counters});
            		allData.save();
            		res.json(allData);
            	}
            })
            
    }

/********************************************* END OF THE REPLY TO A MESSAGE ************************/

/******************************************************************************************************
                         FUNCTION TO CALCULATE THE MESSAGE NOTIFICATION COUNTER
*******************************************************************************************************/

module.exports.mainMessages = function(req,res){
	var userId=req.body.userId;
	var ReceivedTotal=0;
	var ReceivedReplyTotal=0;
	var SenderReplyTotal=0;
	Message.find({recieverId:userId},function(err,allData){
		if(err){
			res.json(err);
		}else{
			

			for(var i=0,len=allData.length;i<len;i++)
			{
                ReceivedTotal=allData[i].counter+ReceivedTotal;
                

                     for(var j=0,len1=allData[i].reply.length;j<len1;j++){
                	   
                	    if(userId!==allData[i].reply[j].replyerId)
                		ReceivedReplyTotal=ReceivedReplyTotal+allData[i].reply[j].receiverCounter;
                	

                }
			}
			
		}
	
	Message.find({senderId:userId},function(err,allData){
		if(err){
			res.json(err);
		}else{
			

			for(var i=0,len=allData.length;i<len;i++)
			{
                
                

                     for(var j=0,len1=allData[i].reply.length;j<len1;j++){
                	   
                	    if(userId!==allData[i].reply[j].replyerId)
                		SenderReplyTotal=SenderReplyTotal+allData[i].reply[j].receiverCounter;
                	

                }
			}
			
			res.json(SenderReplyTotal+ReceivedReplyTotal+ReceivedTotal);
		}
	})

})
}

/************************************ END OF THE MESSAGE NOTIFCATION FUNCTION ************************/


/****************************************************************************************************
                            FUNCTION TO GET THE SENT MESSAGES
******************************************************************************************************/
module.exports.getsentMessages= function(req,res){
	var userId = req.body.userId;
	Message.find({senderId:userId})
	.sort({date:-1})
	.exec(function(err,allData){
		if(err){
			res.json(err);
		}else{
			
			res.json(allData);
		}
	})
}

/********************************** END OF THE FUNCTION TO GET THE SENT MESSAGES *************************/


/********************************************************************************************************
                              FUNCTION TO GET THE  NOTIFICATION FOR DIFFERENT MESSAGES
**********************************************************************************************************/
//to get the message notification
module.exports.getMessageNotification=function(req,res){
	userId=req.body.userId;
	var MessagesInfo=[{}];
	var allData1={};

	Message.find({recieverId:userId},function(err,allData){
		if(err){
			res.json(err);
		}else{
     for(var i=0,len=allData.length;i<len;i++){
     
     	if(allData[i].counter===1){
     	    var allData1=allData[i];
     		MessagesInfo.push({allData1,messageStatus:1});
     	}

     	for(var j=0,len1=allData[i].reply.length;j<len1;j++){
     		if(allData[i].reply[j].receiverCounter===1){
     			var allData2=allData[i].reply[j];
     			MessagesInfo.push({allData2,messageStatus:2})
     		}
     	}
     }
    
      
 }

	})
	//THis is used to find the data on the senderId
	Message.find({senderId:userId},function(err,allData){
		if(err){
			res.json(err);
		}else{
			for(var i=0,len=allData.length;i<len;i++){
				for(var j=0,len1=allData[i].reply.length;j<len1;j++){
					if(allData[i].reply[j].receiverCounter===1){
					var allData3=allData[i].reply[j];
					MessagesInfo.push({allData3,messageStatus:3})
				}
				}
			}
			res.json(MessagesInfo);
		}
	})
}

/********************************* END OF THE MESSAGE NOTIFICATION ******************************************/


/***********************************************************************************************************
                        FUNCTION TO UNSET THE MESSAGE COUNTER AS USE CLICKED
*************************************************************************************************************/
//to unset the notification
module.exports.unsetMessage=function(req,res){
	
	var userId=req.body.userId;
	var message=req.body.message;
	Message.find({recieverId:userId},function(err,allData){
		if(err){
			res.json(err);
		}else{
			for(var i=0,len=allData.length;i<len;i++){
				if(allData[i].message===message)
				{
				allData[i].counter=0;
				allData[i].save();

				for(var j=0,len1=allData[i].reply.length;j<len1;j++){
					allData[i].reply[j].receiverCounter=0;
					allData[i].reply[j].save();
				}
			}/*end of if*/

			}
		   
		}
	})
	Message.find({senderId:userId},function(err,allData){
		if(err){
			res.json(err);
		}else{
			for(var i=0,len=allData.length;i<len;i++){
				if(allData[i].message===message){
				allData[i].counter=0;
				allData[i].save();
				for(var j=0,len1=allData[i].reply.length;j<len1;j++){
					allData[i].reply[j].receiverCounter=0;
					allData[i].reply[j].save();
				}
			}/*end of if*/

			}
		   
		}
	})
};

/************************************** END OF THE UNSET MESSAGE FUNCTION **************************************/