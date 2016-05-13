/*********************************************************************************************************************************************************************
                                                 CONTROLLER FOR THE USERINFORMATION PAGE
**********************************************************************************************************************************************************************/

angular.module('CollegeTalks')
.controller('UserInformationController',['$scope','$http','$state','getUserInformation','$window',function($scope,$http,$state,getUserInformation,$window){

//VARIABLES TO GET THE USER INFORMATION
$scope.getTheUser  = getUserInformation.getUser();
$scope.userId=$scope.getTheUser[0];
$scope.universalId="";
$scope.MessageSent=false;

/**************************************************************************************
                        FUNCTION FOR GET THE USER INFORMATION
**************************************************************************************/
if(localStorage['USER-INFO']==undefined)
{
//Get the all the user information
$scope.getAllUserInformation=function(userId){
	$scope.universalId=userId;
	var request={
		userId:userId
	}
	$http.post('/api/userInformation/getAllInformation',request).success(function(response){
       window.location.reload();
		$scope.allInformation=response;
		localStorage.setItem('USER-INFO',JSON.stringify({userId:response._id}));
		 console.log($scope.allInformation);
		
	}).error(function(err){
		console.log(err);
	})
}
}

/********************************* END OF THE USER INFORMATION **********************/

/**************************************************************************************
                           TO LOAD THE USERINFORMATION INTO THE VARIABLE
***************************************************************************************/
if(localStorage['USER-INFO'])
{
   $scope.theUser=JSON.parse(localStorage['USER-INFO']);
   $scope.userId1=$scope.theUser.userId;
   getAllUserInformation1($scope.userId1);
}

/***************************************************************************************
                 FUNCTION TO GET ALL THE USERINFORMATION
****************************************************************************************/
function getAllUserInformation1(userId1){

	$scope.universalId=userId1;
	var request={
		userId:userId1
	}
	$http.post('/api/userInformation/getAllInformation',request).success(function(response){
		$scope.allInformation=response;
		$scope.followingCounter=response.following.length;
		localStorage.setItem('USER-INFO',JSON.stringify({userId:response._id}));
		 console.log($scope.allInformation);
	
	}).error(function(err){
		console.log(err);
	})
}

/*****************************************************************************************
                       FUNCTION TO LOAD THE CURRENT USER INFORMATION
******************************************************************************************/
//Get the user information from the local storage
if(localStorage['User-Data'])
{
	$scope.currentUser = JSON.parse(localStorage['User-Data']);
	$scope.currentUserId = $scope.currentUser._id;
}


/*****************************************************************************************
                  FUNCTION TO POST THE MESSAGE FROM THE ONE USER TO ANOTHER
*****************************************************************************************/
$scope.postMessage = function(){
	
	console.log("THi si sthe userid1"+$scope.userId1);
var request={
	senderUserId:$scope.currentUserId,
	recieverUserId:$scope.universalId,
	username:$scope.currentUser.username,
	image:$scope.currentUser.image,
	message:$scope.userInfo.message,
	counter:0
}
$http.post('/api/message/postMessage',request).success(function(response){
	console.log("The message has been post");
	$scope.MessageSent=true;
}).error(function(err){
	console.log(err);
})
}

/***************************END OF THE MESSAGE FUNCTION *******************************/

/**************************************************************************************
                    FUNCTION TO GET THE DETAIL OR USERINFORMATION
***************************************************************************************/
$scope.getDetail=function(clickerId){
	getAllUserInformation1(clickerId);
}

/************************** END OF THE USERINFORMATION *******************************/

/*************************************************************************************
                    TO REMOVE TEH USER-INFO FROM THE LOCAL STORAGE
**************************************************************************************/
$scope.$on("$destroy",function(){
	localStorage.removeItem('USER-INFO');
	window.location.reload();
})

/***************************** END OF THE $ON FUNCTION ******************************/

}]);