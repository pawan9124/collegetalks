/*********************************************************************************************************************************************
                                             //THIS IS THE CONTROLLER FOR THE AUTHENTICATION OR LOGIN PAGE//
*********************************************************************************************************************************************/

angular.module('CollegeTalks')
.controller('LoginController',['$scope','$state','$http','$location',function($scope,$state,$http,$location){
	
  //This is used to check whether the user is logged in or not
  if(localStorage['User-Data'])
  {
	$scope.isLoggedIn=true;
}
else
{
     $scope.isLoggedIn=false;
}
/*************************************************************************/


$scope.noLoginMessage=false;//variable to check the loginMessage as loginFailed or not
 
$scope.class="index-background";//This is class for which the background of the page was dependent

/***********************************************************************************************
                      FUNCTION FOR THE LOGIN OF USER
************************************************************************************************/
 $scope.loginUser = function(event){
  if(event.which===1||event.which===13){

   if($scope.email==undefined){
    alert("Please write your email");
    return false;
   }
   if($scope.password==undefined){
    alert("Please write your password");
    return false;
   }
   var request={
    email:$scope.email,
    password:$scope.password
   }
   
 	$http.post('/api/authentication/login',request)
 	.success(function(response){
    if(response==false)
    {
      $scope.noLoginMessage=true;
    }else{
       localStorage.setItem('User-Data',JSON.stringify(response));
       console.log("Item set");
       $scope.class="change-background";
           
      $scope.isLoggedIn=true;
      window.location.reload();
      $location.path('/main');
    }
 	}).error(function(error){
       console.log(error);
 	})

 }//end of the if statement
 }

/******************************************************End of the login function *********************************/

/******************************************************************************************************************
                               FUNCTION FOR THE LOGOUT USER
*******************************************************************************************************************/

 $scope.logout= function(req,res){
 	localStorage.clear();
 	$scope.isLoggedIn=false;
 	window.location.reload();
 }
 
 //$scope.lost="DIng is ping";
}]);
/*******************************End of the Logout User function*************************************************/