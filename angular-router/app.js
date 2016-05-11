angular.module('profile', []);
var app = angular.module('DemoApp', ['ngRoute','profile']);

app.config(function($routeProvider){
	$routeProvider.
		when('/', {
			templateUrl:'templates/login.html',
			controller:'LoginController'
		}).
		when('/employees/:username', {
			templateUrl:'templates/employees-list.html',
			controller:'EmployeesController'
		}).
		when('/profile/:employeeId', {
			templateUrl:'templates/profile.html',
			controller:'ProfileController'
		}).
		otherwise({
			redirectTo:'/'
		});
		
});
			




			