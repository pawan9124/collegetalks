/*****************************************************************************************************************************************************************************
                                                    THIS IS THE SCHEMA FOR THE POSTS SEND BY THE USER
*******************************************************************************************************************************************************************************/

var  mongoose = require('mongoose');

module.exports = mongoose.model('Posts',{
  user:String,
  userId:String,
  userImage:String,
  content:String,
  like:String,
  userLike:[{likeUserId:String}],
  dislike:String,
  userDislike:[{dislikeUserId:String}],
  comment:[{userId:String,commentText:String,postImage:String,postName:String, date:{type:Date,default:Date.now}}],
  date:{type:Date,default:Date.now},
  isEditPost:{type:Boolean,default:false}
  
});