/******************************************************************************************************************************************************************************************
                           THIS IS THE SERVER SIDE CONTROLLER FOR THE LIKE AND DISLIKE,COMMENTS INTO A POST
********************************************************************************************************************************************************************************************/
var Post = require('../datasets/posts');//GET THE SCHEMA DETAIL FROM THE POSTS SCHEMA


/*******************************************************************************************************
                        FUNCTION TO GET THE LIKE AND UPLOAD THE DETAIL FOR LIKE BUTTON
********************************************************************************************************/
module.exports.getLike = function(req,res){
	var contents= req.body.posts;
	var unlike=req.body.unlike;
	var status= req.body.myStatus;
	var userId=req.body.userId;
	Post.find({content:contents},function(err,allData){
		var First= allData[0];
		if(unlike==0)
		{
		var tempLike1= parseInt(First.like);
	    var tempLike2= req.body.like;
		 var finalLike = tempLike1+tempLike2;
		 finalLike =""+finalLike;
		   First.like=finalLike;
		   First.userLike.push({likeUserId:userId});
		}
		if(unlike ==1)
		{
			var tempLike1= parseInt(First.like);
	    var tempLike2= req.body.unlike;
		 var finalLike = tempLike1-tempLike2;
		 finalLike =""+finalLike;
		   First.like=finalLike;
		   First.userLike.pop({likeUserId:userId});
		}
		First.save(function(err){
			if(err){
				console.log(err);
			}else{
				res.json(First);
			}
		})
		
       
	});

}
/***************************************** END OF THE LIKE BUTTON FUNCTION *********************************/


/***********************************************************************************************************
                  FUNCTION TO GET THE DISLIKE AND UPLOAD THE DISLIKE BUTTON DATA
*************************************************************************************************************/
//for the dislike function

module.exports.getDislike = function(req,res){
	var contents  = req.body.posts;
	var undislike = req.body.undislike;
	var userId= req.body.userId;
	Post.find({content:contents},function(err,allData){
				var First = allData[0];
				if(undislike==0)
				{
		var tempDislike1 = parseInt(First.dislike);
		var tempDislike2 = req.body.dislike;
		var finalDislike = tempDislike1+tempDislike2;
		finalDislike=""+finalDislike;
		First.dislike= finalDislike;
		First.userDislike.push({dislikeUserId:userId});
	}
	if(undislike==1)
				{
		var tempDislike1 = parseInt(First.dislike);
		var tempDislike2 = req.body.undislike;
		var finalDislike = tempDislike1-tempDislike2;
		finalDislike=""+finalDislike;
		First.dislike= finalDislike;
		First.userDislike.pop({dislikeUserId:userId});
	}
		First.save(function(err){
			if(err){
				console.log(err);
			}else{
				res.json(First);
		}
		})
	})

}
/********************************** END OF THE DISLIKE BUTTON FUNCTION ***********************************/

/*********************************************************************************************************
              FUNCTION FOR THE COMMENT SECTION TO POST THE COMMENT
**********************************************************************************************************/

//for the comment section function
module.exports.postComments = function(req,res){
	var userId = req.body.userId;
	var contents = req.body.content;
	var comment = req.body.comments;
	var userImage = req.body.userImage;
	var username=req.body.username;

	Post.find({content:contents},function(err,allData){
		var First = allData[0];
		First.comment.push({userId:userId,commentText:comment,postImage:userImage,postName:username});
	
		First.save(function(err){
			if(err){
				console.log(err);
			}else{
			
				res.json(First);
			}
		})
	})
}
/************************************* END OF THE POST THE COMMENT *************************************/

/********************************************************************************************************
                       FUNCTION TO GET THE COMMENTS 
*********************************************************************************************************/
//for the comment section function to be getted
module.exports.getComments = function(req,res){
	var content=req.body.contents;
	Post.find({content:content},function(err,allData){
		var First=allData[0];
		res.json(First);
	})
}

/********************************* END OF THE FUNCTION TO GET COMMENT ************************************/