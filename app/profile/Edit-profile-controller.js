
/***************************************************************************************************************************************************************
                                   EDIT PROFILE CONTROLLER FOR THE EDIT PROFILE PAGE
*****************************************************************************************************************************************************************/
angular.module('CollegeTalks')
.controller('EditProfileController',['Upload','$scope','$http','$state','getUserInformation',function(Upload,$scope,$http,$state,getUserInformation){
  $scope.user = JSON.parse(localStorage['User-Data'])||undefined;

//for the picture alert
 $scope.changePicture=false;


/******************************************************************************************
                             FUNCTION TO UPLOAD THE PICTURE
*******************************************************************************************/
  $scope.$watch(function(){
  	return $scope.file
  },function(){
    $scope.upload($scope.file)
  });

  $scope.upload= function(file){

  	if(file){
  		Upload.upload({
  			url:'/api/profile/editPhoto',
  			method:'POST',
  			data:{userId: $scope.user._id},
  			file:file
  		}).progress(function(evt){
  			console.log('uploading');
  		}).success(function(data){
        $scope.changePicture=true;
        localStorage.setItem('User-Data',JSON.stringify(data));

  		}).error(function(err){
  			console.log(err);
  		})
  	}
   
  };
/********************************** END OF THE PICTURE UPLOAD********************************/


/******************************************************************************************
                             FUNCTION TO LOAD THE PROFILE 
*******************************************************************************************/
 $scope.profileLoad=function(){
  var request={
    userId:$scope.user._id
  }
    $http.post('/api/profile/profileLoad',request).success(function(response){
      $scope.profileLoader=response;
      $scope.viewUser();
    }).error(function(err){
      console.log(err);
    })
 };
 /********************************** END OF LOAD THE PROFILE********************************/


/******************************************************************************************
                             FUNCTION TO MAKE THE DATA EDITABLE
*******************************************************************************************/
 //To make the function editable
 $scope.isEdit=false;
 $scope.isEditable=function()
 {
  $scope.isEdit=true;
 }

 /******************************END OF THE EDITABLE **************************************/

 /******************************************************************************************
                             FUNCTION TO MAKE PROFILE DATA SUBMIT
*******************************************************************************************/
  //To submit the user profile detail
  $scope.error_username=false;
  $scope.error_birthday=false;
  $scope.error_sex=false;
  $scope.error_course=false;
  $scope.error_college=false;
  $scope.error_year=false;
  $scope.error_biography=false;

  $scope.submitProfileDetail=function(){
  $scope.user1 = JSON.parse(localStorage['User-Data'])||undefined;

    $scope.isEditable();
    if($scope.profileLoader.username==undefined ||$scope.profileLoader.username.length==0)
    {
      $scope.error_username=true;
      return false;
    }
    if($scope.profileLoader.birthday==undefined||$scope.profileLoader.birthday.length==0)
    {
      $scope.error_birthday=true;
      return false;
    }
    if($scope.profileLoader.sex==undefined||$scope.profileLoader.sex.length==0)
    {
      $scope.error_sex=true;
      return false;
    }
    if($scope.profileLoader.course==undefined||$scope.profileLoader.course.length==0)
    {
      $scope.error_course=true;
      return false;
    }
    if($scope.profileLoader.year==undefined||$scope.profileLoader.year.length==0)
    {
      $scope.error_year=true;
      return false;
    }
    if($scope.profileLoader.college==undefined||$scope.profileLoader.college.length==0)
    {
      $scope.error_college=true;
      return false;
    }
    
    if($scope.profileLoader.bio==undefined||$scope.profileLoader.bio.length==0)
    {
      $scope.error_biography=true;
      return false;
    }
    var request={
      userId:$scope.user1._id,
      userImage:$scope.user1.image,
      username:$scope.profileLoader.username,
      birthday:$scope.profileLoader.birthday,
           sex:$scope.profileLoader.sex,
           course:$scope.profileLoader.course,
           college:$scope.profileLoader.college,
           year:$scope.profileLoader.year,
           bio:$scope.profileLoader.bio
    }
     $scope.changePicture=false;

    $http.post('/api/profile/submitProfileDetail',request).success(function(response){
       localStorage.clear();
       localStorage.setItem('User-Data',JSON.stringify(response));
       $scope.error_username=false;
  $scope.error_birthday=false;
  $scope.error_sex=false;
  $scope.error_course=false;
  $scope.error_college=false;
  $scope.error_year=false;
  $scope.error_biography=false;
  window.location.reload();
    }).error(function(err){
      console.log(err);
    })
  };
/******************************END OF THE SUBMIT PROFILE**************************************/

/******************************************************************************************
                             FUNCTION TO GET THE USER DETAIL
*******************************************************************************************/
//for getting the user detail
$scope.viewUser= function(){
    var request={
      userId: $scope.user._id
    }
      $http.post('/api/detail/getUser',request).success(function(response){
        $scope.detail=response;
        $scope.followingCount=response.following.length;
        $scope.followersCount=response.followers.length;
               }).error(function(err){
        console.log(err);
      })
   }
/******************************END OF THE USER DETAIL**************************************/

/******************************************************************************************
                             FUNCTION TO ADD THE USER FOR THE USERINFORMATION
*******************************************************************************************/
  $scope.addTheUser = function(theUser)
{
   console.log(theUser);
   console.log("reached the addTheUser");
  getUserInformation.addUser(theUser);
}
/*********************************END OF THE USERINFORMATION*****************************/

}])

/******************************************************************************************
                      FUNCTION TO PROVIDE SERVICE FOR THE USERINFORMATION PAGE
*******************************************************************************************/
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

/*********************************END OF THE SERVICE*****************************/

});