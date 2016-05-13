/*********************************************************************************************************************************************************************************
                                          THIS IS THE SCHEMA FOR THE USER INFORMATION
**********************************************************************************************************************************************************************************/

var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	email: String,
	username:String,
	password:String,
	image:String,
	birthday:String,
	course:String,
	year:String,
	college:String,
	sex:String,
	bio:String,
	followers:[{userId:String,username:String,followersImage:String,counter:Number}],
	following:[{userId:String,username:String,followingImage:String}]
});