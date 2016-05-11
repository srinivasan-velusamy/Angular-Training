app.controller('Controller', ['$scope', function($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
  $scope.showme = false;
  
  $scope.clickMe = function(){
	  $scope.showme = true;
  }
}]);

app.directive('myText', ['$interval', function($interval) {

	function link(scope, element, attrs) {
	   
		scope.$watch(attrs.myText, function(value) {
			$interval(function(){
				element.text(scope.msg);
				scope.showme = false;
			},5000);
		});
	  
	}

	return {
		link: link
	};
}]);

app.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

  function link(scope, element, attrs) {
    var format,
        timeoutId;

    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }

    scope.$watch(attrs.myCurrentTime, function(value) {
      format = value;
      updateTime();
    });

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
  }

  return {
    link: link
  };
}]);