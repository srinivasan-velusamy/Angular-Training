app.directive('employeeDirective', function(){
	return {
		restrict: 'AE',
		scope:{
			'actionType' : '&',
			'actionName' : '@',
			'selectedEmployee' : '=mySelectedEmployee',
		},
		templateUrl: 'directives/employeesDirective.html'
	};
});