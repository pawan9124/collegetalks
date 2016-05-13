/*********************************************************************************************************************************************************************************
                                                  THIS IS THE SCHEMA FOR THE MESSAGES TO BE SENT OR RETRIEVED
***********************************************************************************************************************************************************************************/

var mongoose = require('mongoose');

module.exports = mongoose.model('Message',{
	recieverId:String,
    recieverImage:String,
    recieverUsername:String,
	senderId:String,
	senderImage:String,
	senderUsername:String,
	message:String,
	reply:[{replyerId:String,contents:String,replyerImage:String,replyerUsername:String,receiverCounter:Number,date:{type:Date,default:Date.now}}],
	counter:Number,
	 date:{type:Date,default:Date.now}
	
	 
});