/*****************************************************************************************************************************************************
                                              MESSAGE CONTROLLER FOR THE MESSAGE PAGE
******************************************************************************************************************************************************/


angular.module('CollegeTalks')
.controller('MessageController',['$scope','$http','$state','getUserInformation',function($scope,$http,$state,getUserInformation){
	
//TO GET THE DATA FROM THE LOCAL STORAGE
	if(localStorage['User-Data'])
	{
		$scope.user=JSON.parse(localStorage['User-Data']);
		$scope.userId=$scope.user._id;
	}
	$scope.ifSentMessageNotClicked=true;

/*************************************************************************************
                  FUNCTION FOR GETTING THE WHOLE MESSAGE
**************************************************************************************/

$scope.getMessages=function(initial)
{ 
	

	var request={
		userId:$scope.userId
	}
	$http.post('/api/messages/getMessages',request).success(function(response){
		$scope.getMessages= response;
		
	}).error(function(err){
		console.error(err);
	})

}
/*************************END OF THE GETMESSAGE****************************************/

/**************************************************************************************
              FUNCTION TO THE MESSAGES WHEN SEE RECEIVED MESSAGES BUTTON CLICKED
****************************************************************************************/
$scope.getMessages1=function()
{ 
	$scope.ifSentMessageNotClicked=true;

	var request={
		userId:$scope.userId
	}
	console.log("Start to get the message");
	$http.post('/api/messages/getMessages',request).success(function(response){
		$scope.getMessages= response;

	}).error(function(err){
		console.error(err);
	})

}
/***************************END OF THE SENT MESSAGES************************************/

/****************************************************************************************
                           
******************************************************************************************/

$scope.isClicked=false;
$scope.click= function(senderId)
{
	$scope.isClicked=senderId;
}

/*****************************************************************************************
                        FUNCTION TO SENT THE REPLY
******************************************************************************************/

$scope.replySent=false;
$scope.sendReply = function(event,messageId)
{

	if(event.which === 13){
		var request = {
			messageId:messageId,
			contents:this.reply,
			userId:$scope.userId,
			userImage:$scope.user.image,
			username:$scope.user.username,
			counters:1
			

		}

		$http.post('/api/reply/postReply',request).success(function(response){
			
			
			$scope.replySent=true;
			setInterval(myTimer, 1000);


		}).error(function(err){
			console.log(err);
		})
	}
}

function myTimer() {
    $scope.replySent=false;
}

/***********************************END OF THE SENT REPLY************************************/

/*********************************************************************************************
                        FUNCTION TO GET THE SENT MESSAGES WHEN SEE SENT BUTTON CLICKED
*********************************************************************************************/

//get the sent messages
$scope.getSentMessages=function()
	{
		$scope.ifSentMessageNotClicked=false;
		var request={
			userId:$scope.userId
		}
		
       $http.post('/api/sentMessages/getsentMessages',request).success(function(response){
            $scope.getMessages=response;
                      
       }).error(function(err){
       	console.error(err);
       })
	}
$scope.isRead=false;
	//To unset the message notififcation
  $scope.unsetMessageNoti=function(message){
    console.log("We reache notification");
    var request={
      userId:$scope.user._id,
      message:message
    }
    $http.post('/api/main/unsetMessageNoti',request).success(function(response){
        $scope.hideMessageNoti=true;  
        $scope.isRead=true;     
    }).error(function(err){
      console.log(err);
    })
  };
  
/*******************************************END OF THE SENT MESSAGES***********************/

/******************************************************************************************
                         FUNCTION TO TOGGLE SEE REPLY BUTTON
*******************************************************************************************/

$scope.flag=false;
$scope.flipper=1;
	//toggle  button

	$scope.toggle = function(message)
	{
		 var vm =this;
		if(vm.flipper==1)
		{
        vm.flag=true;
         vm.flipper=2;
         }
         else if(vm.flipper==2)
         {
         	vm.flag=false;
         	vm.flipper=1;
         }
         $scope.unsetMessageNoti(message);
	};

/**********************************END OF THE TOGGLE BUTTON***********************/


/*********************************************************************************
                  FUNCTION TO ADD THE USER INFORMATION TO DISPLAY USER INFO
**********************************************************************************/
	 $scope.addTheUser = function(theUser){
  getUserInformation.addUser(theUser);
}

/*********************END OF THE ADD THE USER***************************/
}])

/************************************************************************
             FUNCTION TO ADD THE SERVICE TO THE USERINFO
*************************************************************************/
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