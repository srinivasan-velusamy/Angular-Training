//Scope implementation
angular.module('profile').controller('ProfileController', function($rootScope, $scope, employeeFactory, $routeParams){
	//$scope.currentEmployee = employeeFactory.sharedProfile;
	$scope.currentEmployee = employeeFactory.showList($routeParams.employeeId);
	
	//update User
	$scope.updateUser = function (idx) {
		$rootScope.message.push("Updated the "+$scope.currentEmployee.name+ " profile");		
		employeeFactory.updateList({"name":$scope.currentEmployee.name, "role": $scope.currentEmployee.role, "project":{"name": $scope.currentEmployee.project.name, "location":$scope.currentEmployee.project.location}}, idx);
	}
});