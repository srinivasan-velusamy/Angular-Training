angular.module('DemoApp').factory('employeeFactory', function(){
	var employees = [{"id":1,"name":'John', "role":'SE', "project":{'name':'ABC', 'location': 'Chennai'}}, 
					{"id":2,"name":'Bill', "role":'SSE', "project":{name:'XYZ', location: 'Bangalore'}}, 
					{"id":3,"name":'Smith', "role":'QA', "project":{name:'MNO', location: 'US'}}, 
					{"id":4, "name":'Donald', "role":'PM', "project":{name:'PQR', location: 'UK'}}];
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
		showList : function(id) {
			if (id > 0 ){
				return employees[id-1];
			} else{
				return employees;		
			}
			
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

//Custom Filters

app.filter('myFilters', function(){	
	return function(empObj){
		retTxt = empObj.name + " is " + empObj.role + ", working in "+ empObj.project.name + " project at " + empObj.project.location + " (filter)";
		return retTxt;
	};
})

//Scope implementation
app.controller('EmployeesController', function($rootScope, $scope, employeeFactory, $location, $routeParams){
	
	$scope.employees = employeeFactory.showList(0);
	$scope.showme = false;
	//console.log($scope.employees);
	$rootScope.message = [];
	$scope.selectedEmployee = {};
	$scope.username = $routeParams.username;
	
	//Add User
	$scope.addUser = function(){
		$count = $scope.employees.length;
		$count = $count + 1;
		employeeFactory.addList({"id":$count,"name":$scope.selectedEmployee.name, "role": $scope.selectedEmployee.role, "project":{"name": $scope.selectedEmployee.project.name, "location":$scope.selectedEmployee.project.location}});
		$rootScope.message.push("Added new employee named "+ $scope.selectedEmployee.name);
		$scope.selectedEmployee.name = null;
		$scope.selectedEmployee.role = null;
		$scope.selectedEmployee.project.name = null;
		$scope.selectedEmployee.project.location = null;
		$scope.showme = true;
		$scope.msg = "Added Successfully!";
		
	}
	
	//Delete User
	$scope.removeUser = function( idx ) {
		console.log(idx);
		$keyVal = $scope.employees.indexOf(idx);
		console.log($keyVal);
		$rootScope.message.push("Delete " + $scope.employees[$keyVal].name +" from the list");
		$scope.employees.splice($keyVal, 1);
	}
	
	//Show User
	$scope.showUser = function(currentEmployee, idx){
		
		//employeeFactory.updateSharedProfile(currentEmployee);
		$rootScope.selectedId = idx;
		$location.path('/profile/'+idx);
		$rootScope.message.push("See " + currentEmployee.name +" profile ");
	}
	
	$scope.init = function() {
		//$scope.showUser($scope.employees[0], 0);
	} 

	$scope.init();
});