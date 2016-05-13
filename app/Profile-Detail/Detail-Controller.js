angular.module('CollegeTalks')
.controller('DetailController',['$scope','$http','$state','getUserInformation',function($scope,$http,$state,getUserInformation){
   
user= JSON.parse(localStorage['User-Data']);
 $scope.userid=user._id;
 console.log($scope.userid);
   $scope.viewUser= function(req,res){
   	var request={
   		userId: $scope.userid
   	}
      $http.post('/api/detail/getUser',request).success(function(response){
      	$scope.detail=response;
         console.log(response);
               }).error(function(err){
      	console.log(err);
      })
   }

   $scope.viewAllUser=function()
   {

      $http.get('/api/detail/getAllUser').success(function(response){
         $scope.allDetail=response;

      }).error(function(err){
         console.log(err);
      })
   };
   $scope.addTheUser = function(theUser)
{
   console.log(theUser);
   console.log("reached the addTheUser");
  getUserInformation.addUser(theUser);
}
}])
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