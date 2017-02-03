/*********************************************************************************************************************************************************************************
                                                 THIS IS THE SERVER SIDE CONTROLLER FOR THE EDIT PROFILE PAGE
***********************************************************************************************************************************************************************************/
var User = require('../datasets/users');
var Waste = require('../datasets/posts');
var Message=require('../datasets/messages');
var fs = require('fs-extra');
var path = require('path');
var mv = require('mv');

/*******************************************************************************************
                FUNCTION TO UPLOAD A PICTURE TO A DATABASE
*******************************************************************************************/
module.exports.updatePhoto = function(req,res){
	var file= req.files.file;
	var userId = req.body.userId;


	var tempPath = file.path;
	var targetPath = path.join(__dirname,"../uploads/"+userId+file.name);
	var savePath = "/uploads/"+ userId+file.name;
	mv(tempPath,targetPath,function(err){
		if(err){
			console.log(err)
		}else{
         
          User.findById(userId,function(err,userData){
          	var user = userData;
          	user.image=savePath;
          	user.save(function(err){
          		if(err){
          			res.json({status:500})
          		}else{
          			res.json(user);
          		}
          	})
          })
		}
	});
};
/******************************* END OF THE UPLOADPHOTO FUNCTION ************************/

/*****************************************************************************************
              FUNCTION TO GET THE PROFILE INFORMATION 
******************************************************************************************/
module.exports.getProfile=function(req,res){
	var userId=req.body.userId;

	User.findById(userId,function(err,allData){
		if(err){
			console.log(err);
		}else{
			res.json(allData);
		}
	})
};

/********************************* GET THE PROFILE INFORMATION ***************************/

/*****************************************************************************************
              FUNCTION TO UPDATE PROFILE 
******************************************************************************************/

module.exports.updateProfile = function(req,res){
	var userId = req.body.userId;
	var image=req.body.userImage;
	var username = req.body.username;
	var birthday=req.body.birthday;
	var sex=req.body.sex;
	var course=req.body.course;
	var year=req.body.year;
	var college=req.body.college;
	var bio=req.body.bio;
	
	//This function is used to update the pics and username on the waste post 
	Waste.find({userId:userId},function(err,userData){

     for(var i=0,len=userData.length;i<len;i++)
     {
     	userData[i].userImage=image;
     	userData[i].username=username;

     	     userData[i].save();
     }
     //end loop
          
  })
//This function is used to update the pics and username on the waste post comment
	Waste.find({},function(err,allData){
       for(var i=0,len=allData.length;i<len;i++){
           for(var j=0,len1=allData[i].comment.length;j<len1;j++)
           {
           	 if(allData[i].comment[j].userId===userId)
           	 {
           	 	 allData[i].comment[j].postImage=image;
           	 	 allData[i].comment[j].postName=username;
           	 	 allData[i].save();
           	 }
           }
       	   
       }

	})


//to udpdate in the message

Message.find({},function(err,allData){
	if(err){
		res.json(err);
	}else{
		for(var i=0,len=allData.length;i<len;i++){
      		
                	if(allData[i].senderId===userId){
                		allData[i].senderImage=image;
                		allData[i].senderUsername=username;
                		allData[i].save();
                	}
                	if(allData[i].recieverId===userId){
                		allData[i].recieverImage=image;
                		allData[i].recieverUsername=username;
                		allData[i].save();
                	}

                	for(var j=0,len1=allData[i].reply.length;j<len1;j++){
                		if(allData[i].reply[j].replyerId===userId)
                		{
                			allData[i].reply[j].replyerImage=image;
                			allData[i].reply[j].replyerUsername=username;
                			allData[i].save();

                		}

                	}//end of j loop
                 	
	}//end of i loop
}//end  of else
})
	//updating the username and image on the User following users followers part
	User.find({},function(err,allData){
      if(err){
      	res.json(err);
      }
      else{
      	for(var i=0,len=allData.length;i<len;i++){
      		
      	    for(var j=0,len1=allData[i].followers.length;j<len1;j++){
      	    	  if(allData[i].followers[j].userId===userId){
      	    	  	allData[i].followers[j].followersImage=image;
      	    	  	allData[i].followers[j].username=username;
      	    	  	allData[i].save();
      	    	  }

      	    }	//end of j loop

      	    for(var k=0,len2=allData[i].following.length;k<len2;k++){
      	    	if(allData[i].following[k].userId===userId){
      	    	  	allData[i].following[k].followingImage=image;
      	    	  	allData[i].following[k].username=username;
      	    	  	allData[i].save();
      	    	  }

      	    }//end of k loop
        
      		}//end of for i

      	}//end of else

	})


	
  	User.findById(userId,function(err,userData){
		var user= userData;
		user.username= username;
		user.birthday=birthday;
		user.sex=sex;
		user.course=course;
		user.year=year;
		user.college=college;
		user.bio=bio;
		user.save(function(err){
			if(err){
				res.json({status:500});
			}else{
				res.json(user);
			}
		})
	});
  

};

/************************************* END OF THE UPDATE PROFILE FUNCTION *************************************/
