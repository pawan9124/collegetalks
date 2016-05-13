/**********************************************************************************************************************************************
                                                       FOLLOW CONTROLLER FOR THE FOLLOW PAGE
***********************************************************************************************************************************************/


angular.module('CollegeTalks')
.controller('FollowController',['$scope','$state','$http','getUserInformation',function($scope,$state,$http,getUserInformation){

//This function is used to get the data from the local storage
 if(localStorage['User-Data'])
 {
 	$scope.currentUser = JSON.parse(localStorage['User-Data']);
 }

 /************************************************************************
                         FUNCTION TO DISPLAY THE LIST OF USER
 ************************************************************************/
$scope.getUsers=function(){
	$http.get('/api/follow/followUser').success(function(response){
		$scope.user=response;

	}).error(function(err){
		console.log(err);
	})
};

/************************************END OF THE USER DISPLAY***********/

$scope.showFollowNoti=false;//variable for the showNotification

/************************************************************************
                 FUNCTION TO GET THE FOLLOW NOTIFICATION
*************************************************************************/
if(localStorage['User-Data'])
{
$scope.getFollowNotification=function(){
	var request={
		userId:$scope.currentUser._id
	}
	$http.post('/api/follow/getFollowNoti',request).success(function(response){
       $scope.initFollow=response.tot;
       if(response.tot >= 1)
       {
       	$scope.showFollowNoti=true;
       }
       $scope.followDetail=response.allData.followers;
     
	}).error(function(err){
		console.log(err);
	})

}
}

/***************************End of the follow notification****************/

$scope.followInit=true;//variable based for show/unshow the noti

/*******************************************************************************
                   FUNCTION TO DISAPPEAR THE NOTIFICATION
********************************************************************************/
$scope.unsetFollowNoti=function(){
	var request={
		userId:$scope.currentUser._id
	}

	$http.post('/api/follow/unsetFollowNoti',request).success(function(response){
	}).error(function(err){
		console.log(err);
	})
   $scope.followInit=false;
};
/**********************************END OF THE UNSET NOTIFICATION*****************/

/********************************************************************************
                     FUNCTION FOR THE FOLLOW TO SOMEONE
**********************************************************************************/
$scope.follow = function(currentUserId,usersId,usersImage,currentUserImage,usersUsername,currentUsername)
{
	var request={
		currentUserId:currentUserId,
		usersImage:usersImage,
		currentUserImage:currentUserImage,
		currentUsername:currentUsername,
		usersUsername:usersUsername,
		otherUserId:usersId,
		counter:1		
	}
	$http.post('/api/follow/followPost',request).success(function(response){
		localStorage.clear();
		localStorage.setItem('User-Data',JSON.stringify(response));
		$scope.follower_id=usersId;
		window.location.reload();
	}).error(function(err){
		console.log(err);
	})
};
/*************************END OF THE FOLLOW FUNCTION***********************/


/**************************************************************************
              FUNCTION TO CHECK THE USE IF FOLLOWING SOMEONE
****************************************************************************/
$scope.checkIsFollowing=function(usersId){
	for(var i=0,len=$scope.currentUser.following.length;i<len;i++){
		if($scope.currentUser.following[i].userId===usersId){
			
			return true;
			
		}
	}
	return false;

};
/***************************END OF THE CHECK FOLLOWING**********************/

/***************************************************************************
              FUNCTION TO UNFOLLOW USER
*****************************************************************************/

$scope.unfollow=function(otherUserId)
{
	var request={
		currentUserId:$scope.currentUser._id,
		otherUserId:otherUserId
	}
	$http.post('/api/follow/unfollow',request).success(function(response){
		localStorage.clear();
		localStorage.setItem('User-Data',JSON.stringify(response));
		window.location.reload();
	}).error(function(err){
		console.log(err);
	})
};

/************************END OF THE UNFOLLOW USER***************************/

/****************************************************************************************
               FUNCTION TO PASS THE USERINFORMATION THROUGH SERVICE TO USERINFO PAGE
*****************************************************************************************/
$scope.addTheUser = function(theUser)
{
	console.log(theUser);
	console.log("reached the addTheUser");
  getUserInformation.addUser(theUser);
}

/***************************END OF THE ADDUSER*****************************************/
}])

/**************************************************************************************
                       FUNCTION FOR THE SERVICE TO BE ADDED
**************************************************************************************/
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