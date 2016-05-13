/***************************************************************************************************************************************************************************
                    // THIS IS THE SERVER FOR THE WHICH THE PAGES CONTROLLER REQUEST AND THE SERVER CONTROLLER ARE GET CONNECTED
****************************************************************************************************************************************************************************/

/********************************************************************************
            CONFIGURATION FOR THE SET UP OF SERVER
*********************************************************************************/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multipart = require('connect-multiparty');
var config     = require('./config');
var multipartMiddleware = multipart();

/********************************* END OF THE SERVER SETUP*************************/




/**********************************************************************************
                     CONNECTION TO THE MONGODB
***********************************************************************************/
mongoose.connect(config.database);

/************************************ END OF THE MONGODB CONNECTION ****************/



/************************************************************************************
                 CONTROLLERS CONFIGURATION 
*************************************************************************************/


 var profileController = require('./server/profile-controller.js');
var authenticationController = require('./server/authentication-controller.js');
var editProfileController = require('./server/Server-Edit-profile-controller.js');
var detailController= require('./server/detail-controller.js');
var wasteController = require('./server/waste-controller.js');
var followController = require('./server/server-follow-controller.js');
var likeController = require('./server/like-controller.js');
var userInformation = require('./server/user-information-controller.js');
var messageController = require('./server/message-controller.js');

/************************************ END OF THE CONTROLLERS CONFIGURATION ******************/



/*******************************************************************************************
                            DIRECTORY SETUP 
**********************************************************************************************/

//Directory setup
app.use(bodyParser.json());
app.use('/app',express.static(__dirname+'/app'));
app.use('/node_modules',express.static(__dirname+'/node_modules'));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/images',express.static(__dirname+'/images'));
app.use('/css',express.static(__dirname+'/css'));

/***************************************** END OF THE DIRECTORY SETUP **************************/




/************************************************************************************************
                 ROUTING TO THE POST ACCORDING TO THE REQUESTS
/************************************************************************************************/



/*************************************************************************************************
                                      SIGNUP POST
**************************************************************************************************/
app.post('/api/profile/signup',profileController.signup);
/***************************** END OF SIGNUP ****************************************************/



/*************************************************************************************************
                                       AUTHENTICATION POST
**************************************************************************************************/
app.post('/api/authentication/login',authenticationController.login);

/********************************* END OF AUTHENTICATION ***************************************/


/*************************************************************************************************
                                       EDIT PROFILE POST
**************************************************************************************************/
//Edit Profile Posting
app.post('/api/profile/editPhoto',multipartMiddleware,editProfileController.updatePhoto);
app.post('/api/profile/submitProfileDetail',editProfileController.updateProfile);
app.post('/api/profile/profileLoad',editProfileController.getProfile);

/***************************************** END OF EDIT PROFILE POST ******************************/



/******************************************* Details*******************************************/
//get the details
app.post('/api/detail/getUser',detailController.getUser);
app.post('/api/detail/getAllUser',detailController.getAllUser);

/**************************************************************************************************/


/*************************************************************************************************
                                       WASTE POST
**************************************************************************************************/
//waste controller
app.post('/api/waste/posts',wasteController.postWaste);
app.post('/api/waste/get',wasteController.getWastes);
app.post('/api/waste/UpdatePost',wasteController.updateWaste);
app.post('/api/waste/removePost',wasteController.deletePost);
app.post('/api/waste/removeComment',wasteController.removeComment);
app.post('/api/following/getFollowingWastes',wasteController.getFollowingWastes);

/**************************************** END OF WASTE POST****************************************/


/*************************************************************************************************
                                       FOLLOW POST
**************************************************************************************************/

//Follow Users
app.get('/api/follow/followUser',followController.getUsers);
app.post('/api/follow/followPost',followController.postFollow);
app.post('/api/follow/unfollow',followController.unfollowUser);
app.post('/api/follow/getFollowNoti',followController.getFollowNoti);
app.post('/api/follow/unsetFollowNoti',followController.unsetFollowNoti);
/******************************************* END OF FOLLOW POST **********************************/



/*************************************************************************************************
                                        LIKES,DISLIKES, COMMENTS POST
**************************************************************************************************/
//Get the likes,dislikes,comments
app.post('/api/like/getLike',likeController.getLike);
app.post('/api/dislike/getDislike',likeController.getDislike);
app.post('/api/comments/getComments',likeController.getComments);
app.post('/api/comments/postComments',likeController.postComments);

/****************************************** END OF LIKES,DISLIKES,COMMENTS POST *******************/



/*************************************************************************************************
                                       USER INFORMATION POST
**************************************************************************************************/
//get the userInformation
app.post('/api/userInformation/getAllInformation',userInformation.getAllInformation);
app.post('/api/message/postMessage',userInformation.postMessage);

/************************************ END OF USER INFORMATION POST *******************************/


/*************************************************************************************************
                                       MESSAGE POST
**************************************************************************************************/
//Messages
app.post('/api/messages/getMessages',messageController.getMessages);
app.post('/api/reply/postReply',messageController.postReply);
app.post('/api/main/messages',messageController.mainMessages);
app.post('/api/main/unsetMessageNoti',messageController.unsetMessage);
app.post('/api/main/getMessageNotification',messageController.getMessageNotification);

//get the sent Messages
app.post('/api/sentMessages/getsentMessages',messageController.getsentMessages);

/********************************** END OF THE MESSAGE POST ***************************************/


/*************************************************************************************************
                                       RETURN INDEX ON FIRST
**************************************************************************************************/
app.get('/',function(req,res){
	res.sendfile('index.html');
});
/*************************************** END OF INDEX ********************************************/

/*************************************************************************************************
                                      LISTENING TO THE PORT 8080
**************************************************************************************************/
app.listen(config.port);
console.log('Visit the port'+config.port);
/**************************************** END OF LISTENING TO THE PORT ***************************/