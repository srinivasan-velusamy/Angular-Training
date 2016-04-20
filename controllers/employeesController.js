angular.module('DemoApp').factory('employeeFactory', function(){
	var employees = [{"name":'John', "role":'SE', "project":{'name':'ABC', 'location': 'Chennai'}}, 
					{"name":'Bill', "role":'SSE', "project":{name:'XYZ', location: 'Bangalore'}}, 
					{"name":'Smith', "role":'QA', "project":{name:'MNO', location: 'US'}}, 
					{"name":'Donald', "role":'PM', "project":{name:'PQR', location: 'UK'}}];
	return {
		sharedProfile: {
			name:'a',
			role:'b',
			project: {
				name : 'x',
				location : 'z'
			}
		},
		updateSharedProfile : function(newEmployee) {
			this.sharedProfile.name = newEmployee.name;
			this.sharedProfile.role = newEmployee.role;
			this.sharedProfile.project.name = newEmployee.project.name;
			this.sharedProfile.project.location = newEmployee.project.location;
		},
		showList : function() {
			return employees;
		},
		addList : function(userObj) {
			employees.push(userObj);			
		},
		updateList : function(userObj, idx){
			employees.splice(idx, 1);
			employees.splice(idx, 0, userObj);
			console.log(userObj);
			
		}
		
	};
	
	
	
});

//Scope implementation
app.controller('EmployeeController', function($rootScope, $scope, employeeFactory){
	
	$scope.employees = employeeFactory.showList();
	//console.log($scope.employees);
	$rootScope.username = "Srinivasan";
	$rootScope.message = [];
	$scope.selectedEmployee = {};
	
	//Add User
	$scope.addUser = function(){
			
		employeeFactory.addList({"name":$scope.selectedEmployee.name, "role": $scope.selectedEmployee.role, "project":{"name": $scope.selectedEmployee.project.name, "location":$scope.selectedEmployee.project.location}});
		$rootScope.message.push("Added new employee named "+ $scope.selectedEmployee.name);
		$scope.selectedEmployee.name = null;
		$scope.selectedEmployee.role = null;
		$scope.selectedEmployee.project.name = null;
		$scope.selectedEmployee.project.location = null;	
		
	}
	
	//Delete User
	$scope.removeUser = function( idx ) {
		$rootScope.message.push("Delete " + $scope.employees[idx].name +" from the list");
		$scope.employees.splice(idx, 1);
	}
	
	//Show User
	$scope.showUser = function(currentEmployee, idx){
		console.log(idx);
		employeeFactory.updateSharedProfile(currentEmployee);
		$rootScope.selectedId = idx;
		$rootScope.message.push("See " + currentEmployee.name +" profile ");
	}
	
	$scope.init = function() {
		$scope.showUser($scope.employees[0], 0);
	} 

	$scope.init();
});