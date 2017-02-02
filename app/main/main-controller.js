/***************************************************************************************************************************************************
                                           //MAIN CONTROLLER FOR THE HOME PAGE//
*****************************************************************************************************************************************************/


angular.module('CollegeTalks')
.controller('MainController',['$scope','$http','$interval','getUserInformation','$state',function($scope,$http,$interval,getUserInformation,$state){

   $scope.mainLoaded=false;//variable for the spinner

//TO TAKE THE DATA FROM THE LOCAL STORAGE
   if(localStorage['User-Data']!== undefined)
   {
   	$scope.user= JSON.parse(localStorage['User-Data']);
    $scope.class="change-background";
   }

 //THIS IS TO CHANGE THE BACKGROUND WHEN THE USER IS LOGGEDIN  
if(localStorage['User-Data']==undefined){
       $scope.class="index-background";
     }

/*************************************************************************
                  FUNCTION FOR THE MESSAGE NOTIFICATION NUMBER
*************************************************************************/     
    if(localStorage['User-Data']){
    $scope.getMessages=function()
  {
     $scope.getMessageNotification();
    var request={
      userId:$scope.user._id
    }
    $http.post('/api/main/messages',request).success(function(response){
        $scope.initMessage=response;
            }).error(function(err){
      console.error(err);
    })
      }
    }
/***************************END OF THE MESSAGE NOTI NUMBER **********************/


$scope.showMessageNoti=false;
$scope.isMessageStatus1=false;
$scope.isMessageStatus2=false;
$scope.isMessageStatus3=false;
 $scope.forData1=[];
 $scope.forData2=[];
 $scope.forData3=[];

/*********************************************************************************
                        FUNCTION FOR THE MESSAGE NOTIFICATION
**********************************************************************************/
      if(localStorage['User-Data'])
      {
      $scope.getMessageNotification=function(){
        var request={
          userId:$scope.user._id
        }
        $http.post('/api/main/getMessageNotification',request).success(function(response){
          $scope.messageNoti=response;
          for(var i=0,len=response.length;i<len;i++){
              
          if(response.length>1)
          {
          $scope.showMessageNoti=true;
          if(response[i].messageStatus==1){
            var hold=response[i].allData1;
            $scope.forData1.push({hold});
            
            $scope.isMessageStatus1=true;
          }
          if(response[i].messageStatus==2){
            var hold=response[i].allData2;
            $scope.forData2.push({hold});
            
            $scope.isMessageStatus2=true;
          }
          if(response[i].messageStatus==3){
            var hold=response[i].allData3;
            $scope.forData3.push({hold});
            $scope.isMessageStatus3=true;
          }
        }
      }
        })
      }
    }
/*********************************END OF THE MESSAGE NOTIFICATION*******************/
      //variable for the hideMessagenotification
      $scope.hideMessageNoti=false;

/************************************************************************************
                     FUNCTION TO UNSET THE MESSAGE NOTIFICATION
*************************************************************************************/
  //To unset the message notififcation
  $scope.unsetMessageNoti=function(){
    var request={
      userId:$scope.user._id
    }
    $http.post('/api/main/unsetMessageNoti',request).success(function(response){
        $scope.hideMessageNoti=true;       
    }).error(function(err){
      console.log(err);
    })
  };
  
/******************** END OF THE UNSET NOTIFICATION*******************************/


/*********************************************************************************
                      FUNCTION TO SEND WASTE or POST 
**********************************************************************************/
   $scope.sendWaste= function(event){
   	if(event.which === 13)
   	{
      if($scope.newPosts.length==0){
        alert("Please enter some words");
             return false;
      }
   		var request={
   			user:$scope.user.username || $scope.user.mail,
   			userId: $scope.user._id,
   			userImage:$scope.user.image,
   			content:$scope.newPosts,
        userLike:"1",
        userDislike:"1",
   			like:0,
   			dislike:0
   		}
   		$http.post('/api/waste/posts',request).success(function(response){
   			$scope.wastes=response;
   		}).error(function(error){
        console.log(error);
   		})
   	}

   };
  /************************************END OF THE WASTE FUNCTION***********************/



 $scope.test=true;

 /****************************************************************************************
                       FUNCTION FOR THE GET THE WASTE AT THE HOME PAGE
 *****************************************************************************************/
   function getWastes(initial){
     var data={};
     if($scope.test==true&& $scope.user){
      data.following=angular.copy($scope.user.following);
      data.following.push({userId:$scope.user._id});
     }
   	$http.post('/api/waste/get',data).success(function(response){
   		if(initial){
   			$scope.wastes=response;
        console.log("here in initial");
        $scope.mainLoaded=true;
   		}else{
   			if(response.length > $scope.wastes.length){
   				$scope.incomingWastes=response;
   			}
   		}
   	})
   };

   
   $interval(function(){
   	getWastes(false);
   	
   	if($scope.incomingWastes){
   		$scope.difference=$scope.incomingWastes.length -$scope.wastes.length;
   	}
   },5000)
/****************************END OF THE GET WASTE*******************************/


/*************************************************************************************
                   FUNCTION TO SET THE NEW POSTS TO THE CURRENT POST
**************************************************************************************/
   $scope.setNewWastes=function(){
   	$scope.wastes = angular.copy($scope.incomingWastes);
   	$scope.incomingWastes = undefined;
   }

/*************************************END OF THE SET NEW WASTE*********************/

   //initial
   getWastes(true);
   //*************************************************************************************************//
   //                               for the like function                                            //
   //************************************************************************************************//
 
   $scope.imageurl1= "images/like.png";
   $scope.imageurl3= "images/like1.png";
  
   $scope.unlike=false;
   $scope.shifter=1;
   $scope.like=function(content,wastelike){
    var unlike1=0;
    if(this.shifter==1)
    {
      this.imageurl1='images/like1.png';
      this.unlike=true;
        this.shifter=2;
    }
    else{
      this.imageurl1='images/like.png';
      this.unlike = false;
      this.shifter=1;
    
      
    }
     if(this.unlike==false)
     {
    unlike1=1;
     }
     
   	var request={
   		posts:content,
   		like:1,
      unlike:unlike1,
      userId:$scope.user._id

   	}
   	
    $http.post('/api/like/getLike',request).success(function(response){
    	$scope.ServerLikes=response;
    	wastelike.like=angular.copy($scope.ServerLikes.like);
     
      }).error(function(err){
        console.log(err);
    })
}

$scope.isLiked=false;

$scope.checkThatFucker=function(response){
  
  for(var i=0,len=response.length;i<len;i++){
    if(response[i].likeUserId==$scope.user._id){
      //this.imageurl1="images/like1.png";
      this.unlike1=true;
      this.isLiked=true;
      $scope.shifter1=2;
    }
  }
}
    
    //for the function used when the fllipped was done if the user was clicked the like button
    $scope.unlike1=false;
     $scope.shifter1=1;
    
    $scope.like1=function(content,wastelike){
      var unlike2=0;
    if(this.shifter1==1)
    {
      this.imageurl3='images/like1.png';
      this.unlike1=true;
        this.shifter1=2;
    }
    else{
      this.imageurl3='images/like.png';
      this.unlike1 = false;
      this.shifter1=1;
      
      
    }
     if(this.unlike1==false)
     {
    unlike2=1;
     }
     
    var request={
      posts:content,
      like:1,
      unlike:unlike2,
      userId:$scope.user._id

    }
    
    $http.post('/api/like/getLike',request).success(function(response){
      $scope.ServerLikes=response;
      wastelike.like=angular.copy($scope.ServerLikes.like);
     
      }).error(function(err){
        console.log(err);
    })
    }




//***************************************************************************************************//
// THis is the function for provind the dislike function                                            //
//**************************************************************************************************//
$scope.imageurl2="images/dislike.png";
$scope.imageurl4="images/dislike1.png";

$scope.undislike=false;
 $scope.shifter3=1;
//for the dislike function
$scope.dislike = function(content,wastedislike){
  var undislike1=0;
  if(this.shifter3==1)
    {
      
      this.imageurl2='images/dislike1.png';
      this.undislike=true;
        this.shifter3=2;

    }
    else{
      this.imageurl2='images/dislike.png';
       this.undislike=false;
        this.shifter3=1;
    }
    if(this.undislike==false)
     {
    undislike1=1;
     }
		var request={
		posts:content,
		dislike:1,
    undislike:undislike1,
    userId:$scope.user._id
	}

	$http.post('/api/dislike/getDislike',request).success(function(response){
		$scope.ServerDislikes = response;
    wastedislike.dislike=angular.copy($scope.ServerDislikes.dislike);

	}).error(function(err){
    console.log(err);
	})
}


$scope.checkThatDislikeFucker=function(response){
  for(var i=0,len=response.length;i<len;i++){
    
    if(response[i].dislikeUserId==$scope.user._id){
      this.imageurl="images/dislike1.png";
      this.undislike1=true;
      this.isDisliked=true;
      $scope.shifter4=2;
     
    }
  }

}

//this is the function for the flip on the undislike button
$scope.undislike1=false;
 $scope.shifter4=1;
//for the dislike function
$scope.dislike1= function(content,wastedislike){
  var undislike2=0;
  if(this.shifter4==1)
    {
      
      this.imageurl4='images/dislike1.png';
      this.undislike1=true;
       this.shifter4=2;

    }
    else{
      this.imageurl4='images/dislike.png';
       this.undislike1=false;
      this.shifter4=1;
    }
    if(this.undislike1==false)
     {
    undislike2=1;
     }
    var request={
    posts:content,
    dislike:1,
    undislike:undislike2,
    userId:$scope.user._id
  }

  $http.post('/api/dislike/getDislike',request).success(function(response){
    $scope.ServerDislikes = response;
    wastedislike.dislike=angular.copy($scope.ServerDislikes.dislike);

  }).error(function(err){
    console.log(err);
  })
}

//***************************************************************************************************************//
//**************************************************************************************************************//


/***************************************************************************************************************
                       FUNCTION TO SET THE COMMENTS
****************************************************************************************************************/
$scope.setComments = function(event,content){
	if(event.which === 13)
	{
    if($scope.goComment.newComment.length==0){
      alert("Please enter the comment");
      return false;
    }
		var request={
	comments:$scope.goComment.newComment,
	userId:$scope.user._id,
  userImage:$scope.user.image,
  username:$scope.user.username,
	content:content
                    }
                    $scope.goComment.newComment="";

    $http.post('/api/comments/postComments',request).success(function(response){
      $scope.commentSection=response;

    }).error(function(err){
      console.log(err);
    })

}
}
/****************************** END OF THE SET COMMENT************************************/


/******************************************************************************************
               FUCNTION TO  GET THE COMMENT ON  A POST
*******************************************************************************************/
$scope.getComment=function(content,wasteComment){

	var request={
		contents:content
	}
	$http.post('/api/comments/getComments',request).success(function(response){
		$scope.commentSection=response;
    console.log($scope.commentSection.comment);
		$scope.commentsNo=$scope.commentSection.comment.length;
    wasteComment.comment.length= angular.copy($scope.commentsNo);

	}).error(function(err){
		console.log(err);
	})
}

/*****************************END OF THE GET COMMENT*************************/
$scope.isChoosed=true;
//This is the choosing of the filter

/***************************************************************************************************
                     FUNCTION TO DISPLAY ALL THE POSTS
****************************************************************************************************/
$scope.displayAll=function()
{
  $scope.isChoosed=false;
  $scope.test=false;
  getWastes();
    
 
};
/***********************************END OF THE DISPLAY POST****************************************/


/*****************************************************************************************************
               FUNCTION TO DISPLAY THE POST ONLY FOLLOWING
******************************************************************************************************/
 $scope.displayOnlyFollowing=function()
{
  $scope.isChoosed=true;
  getWastes();
    window.location.reload();
};
/***********************************END OF THE DISPLAY POST*******************************************/


/***************************************************************************************************************
                      For the Post to be edited (EditPost()) 
**************************************************************************************************************/
// var to make the textarea view and hide the waste content 
$scope.flagForEdit=1;//this is the flag to flip for getting the value of content before it changes
$scope.TempPost="";//This is to hold the unchanged content used to search on the server side for updation

$scope.EditPost=function(){
  this.waste.isEditPost=true;
  $scope.TempPost=this.waste.content;
console.log(this.waste.content);
  

}
$scope.getResponse="";//this variable is used to get the response from the $http function as $this is not working to hold the response 

//For the posting of the edited part
$scope.EditPostSubmit=function(content,waste){
   console.log(this.waste);
var request={
  content:content,
   TempPost:$scope.TempPost
}
$http.post('/api/waste/UpdatePost',request).success(function(response){
$scope.getResponse=response;
waste.content=$scope.getResponse;
console.log($scope.getResponse);
waste.isEditPost=false;


}).error(function(err){
    console.log(err);
})




}



/**********************************ENd of the EditPost*******************************************************/




/************************************************************************************************************
                                       FOR THE DELETION OF THE POST
 ************************************************************************************************************/

$scope.deletePost=function(content,waste){
  var request={
    content:content
  }
  $http.post('/api/waste/removePost',request).success(function(response){
   window.location.reload();

  }).error(function(err){

  })
}

 /****************************************End of the DeletionPost*******************************************/

 /*********************************************************************************************************
                                         FOR THE DELETION OF THE COMMENT
 **********************************************************************************************************/

$scope.removeComment=function(comment,content,commenting){
  console.log("we reach here");
  var request={
    comment:comment,
    content:content
  }
  $http.post('/api/waste/removeComment',request).success(function(response){
    console.log(response);
   $scope.commentSection=response;

  }).error(function(err){

  })
}

 /***************************************End of the Deletion Comment**************************************/


 /************************************************************************************************************
                        FUNCTION TO ADD THE USER INFORAMTION TO TRANSPORT TO THE INFO PAGE
 *************************************************************************************************************/

$scope.addTheUser = function(theUser)
{
	console.log(theUser);
	console.log("reached the addTheUser");
  getUserInformation.addUser(theUser);
}
}])
//services are used to pass the information to the userInformation Controller
.service('getUserInformation',function(){
	var userInformation=[];
	var addUser = function(user){
		userInformation.push(user);
	}
	var getUser = function(){
		return userInformation;
	}
	return{
		addUser:addUser,
		getUser:getUser
	}



});