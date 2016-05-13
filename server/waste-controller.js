/**************************************************************************************************************************************************************************
                                        THIS IS THE SERVER SIDE FOR THE POST CONTROLLER IN MAIN CONTROLLER
***************************************************************************************************************************************************************************/


var Waste = require('../datasets/posts.js');

/******************************************************************************************************************
               FUNCTION TO POST THE WASTE 
*******************************************************************************************************************/
module.exports.postWaste = function(req,res){
	var waste = new Waste();
    waste.user=req.body.user;
    waste.userId=req.body.userId;
    waste.userImage=req.body.userImage;
    waste.content=req.body.content;
    waste.like=req.body.like;
    waste.dislike=req.body.dislike;
    waste.userLike.push({likeUserId:req.body.userLike});
    waste.userDislike.push({dislikeUserId:req.body.userDislike});
	waste.save();
    Waste.find({})
    .sort({date:-1}).exec(function(err,allWastes){
    	if(err){
    		res.error(error);
    	}else{
    		res.json(allWastes);
    	}
    })
}

/************************************ END OF THE WASTE *************************************************************/

/******************************************************************************************************************
               FUNCTION TO GET THE WASTE
********************************************************************************************************************/
module.exports.getWastes = function(req,res){
if(!req.body.following){
Waste.find({})
.sort({date:-1})
.exec(function(err,allWastes){
	if(err){
		res.error(err);
	}else{
		res.json(allWastes);
		
	}
})
}
else{
    var requestedWastes=[];
    for(var i=0,len=req.body.following.length;i<len;i++){
        requestedWastes.push({userId:req.body.following[i].userId});
    }
    Waste.find({$or:requestedWastes})
    .sort({date:-1})
    .exec(function(err,allWastes){
        if(err){
            res.error(err);
        }else{
            res.json(allWastes);
        }
    })
};

}
/********************************* END TO GET THE WASTE *********************************************************/
 
/*****************************************************************************************************************
                  FUNCTION TO GET THE FOLLOWING POSTS
*********************************************************************************************************************/

module.exports.getFollowingWastes=function(req,res){
    var requestedWasterId=[];
    for(var i=0,len=req.body.following.length;i<len;i++)
    {
        requestedWasterId.push({userId:req.body.following[i].userId});
    }
    Waste.find({$or: requestedWasterId})
    .sort({date:-1})
    .exec(function(err,allWastes){
        if(err){
            res.error(err);
        }else{
            res.json(allWastes);
        }
    })
}

/********************************* END OF THE FOLLOWING POST FUNCTION ****************************************/

//********************************************************************************/
//               This function is used to update the waste in the waste section
//***********************************************************************************/

module.exports.updateWaste=function(req,res){
    var tempPost=req.body.TempPost;
    var content=req.body.content;

    Waste.find({content:tempPost},function(err,data){
        if(err){
            res.json(err);
        }else{
            var post=data[0];
            post.content=content;
            post.save();
            res.json(post.content);
        }
    })
}

/************************************ END OF THE UPDATE WASTE***************************/

/***********************************************************************************
              This function is used to delete the post from the waste section 
************************************************************************************/

module.exports.deletePost=function(req,res){
    var content=req.body.content;
    Waste.remove({content:content},function(err,allData){
        if(err){
            res.json(err);
        }else{
            res.json(allData);
        }
    })
}
/***************************************** END OF THE DELETE POST *************************/

/*****************************************************************************************
         This function is used to delete the comment from the waste of the user
*****************************************************************************************/
module.exports.removeComment=function(req,res){
    var commentText =req.body.comment;
    var content=req.body.content;
    Waste.find({content:content},function(err,allData){
        if(err){
            res.json(err);
        }else
        {
            allData[0].comment.pop({commentText:commentText});
               allData[0].save();
               res.json(allData);
            
        }
    })
}
/*********************************** END OF THE DELETE COMMENT *********************************/