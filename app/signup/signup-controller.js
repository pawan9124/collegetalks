/***************************************************************************************************************************************************************
                                                            CONTROLLER FOR THE SIGNUP BUTTON
****************************************************************************************************************************************************************/

angular.module('CollegeTalks')
.controller('SignUpController',['$scope','$http','$state',function($scope,$http,$state){

	$scope.userCreated=false;//VARIABLE FOR THE MESSAGE IF USER CREATED
	 $scope.userExists=false;//VARIABLE FOR THE MESSAGE IF USER EXISTS

/****************************************************************************************
                     FUNCTION FOR THE SIGNUP 
*****************************************************************************************/
   $scope.signup=function(req,res){
        var se=validateEmail($scope.UserEmail);
        if(se==false){
        	alert("Please enter valid email");
        	return false;
        }

        if($scope.UserPassword.length<=3){
        	alert("Password must be greater than 3 digits");
        	return false;
        }

        if($scope.UserEmail==undefined || $scope.UserEmail.length==0){
        	alert("Please write your email on Signup Inputbox");
        	        	return false;
        }
        if($scope.Username==undefined || $scope.Username.length==0){
        	alert("Please write your username on Signup Inputbox");
        	        	return false;
        }
        if($scope.UserPassword==undefined||$scope.UserPassword.length==0){
        	alert("Please write your password on Signup Inputbox");
        	return false;
        }
        var request={
        	email:$scope.UserEmail,
        	password:$scope.UserPassword,
        	username:$scope.Username
        }
   	  $http.post('/api/profile/signup',request).success(function(response){
           console.log(response);
           if(response==2)
           $scope.userCreated=true;
            if(response==1)
            $scope.userExists=true;
          else
           $scope.userExists=false;
   	  }).error(function(error){

   	  })
   	}
   	function validateEmail(email){
   	 	var re= /\S+@\S.\S+/;
   	 	return re.test(email);
   	 }
}]);
/********************************** END OF THE SIGNUP BUTTON ********************************/