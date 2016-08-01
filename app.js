
var app = angular.module('SmartBus', ['angularMoment', 'relativeDate', 'ngAnimate']);

app.controller('DashboardController', ['$scope', '$interval', function($scope, $interval) {

  $scope.clock = new Date();
  $scope.in = 0;
  $scope.out = 0;
  $scope.current = 0;

  $scope.historyList = [];

  $scope.addPassenger = function() {
    $scope.in++;
    $scope.addHistory("In");
    $scope.current = $scope.in - $scope.out;
  };

  $scope.removePassenger = function() {
    $scope.out++;
    $scope.addHistory("Out");
    $scope.current = $scope.in - $scope.out;
  };

  $scope.addHistory = function(message) {
    console.log("ASDAS");
    $scope.historyList.unshift({
      action: message,
      time: new Date()
    });
  };

  $interval(function() {
    $scope.clock = new Date();
  }, 1000);

}]);
