//Scope implementation
app.controller('LoginController', function($rootScope, $scope, $location){
	
	//Login User
	$scope.loginUser = function(){
		//$rootScope.username = $scope.loginName;
		$location.path('/employees/'+$scope.loginName);
	}

});