
var app = angular.module('SmartBus', ['angularMoment', 'relativeDate', 'ngAnimate']);

app.controller('DashboardController', ['$scope', '$interval', function($scope, $interval) {

  $scope.clock = new Date();
  $scope.in = 0;
  $scope.out = 0;
  $scope.current = 0;

  $scope.historyList = [];

  $scope.state = function() {
    if ($scope.current < 10) return "empty";
    else if ($scope.current < 20) return "crowded";
    else return "full";
  };

  $scope.addPassenger = function() {
    $scope.in++;
    $scope.addHistory("In", "green");
    $scope.current = $scope.in - $scope.out;
  };

  $scope.removePassenger = function() {
    $scope.out++;
    $scope.addHistory("Out", "red");
    $scope.current = $scope.in - $scope.out;
  };

  $scope.addHistory = function(message, color) {
    console.log(color);
    $scope.historyList.unshift({
      action: message,
      color: color,
      time: new Date()
    });
  };

  $interval(function() {
    $scope.clock = new Date();
  }, 1000);

}]);
