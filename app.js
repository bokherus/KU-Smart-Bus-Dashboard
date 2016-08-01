
var app = angular.module('SmartBus', ['angularMoment']);

app.controller('DashboardController', ['$scope', '$interval', function($scope, $interval) {

  $scope.clock = new Date();
  $scope.in = 300;
  $scope.out = 240;
  $scope.current;

  $scope.addPassenger = function() {
    $scope.in++;
  };

  $scope.removePassenger = function() {
    $scope.out++;
  };

  $scope.currentTime = function() {
    return new Date();
  };

  $interval(function() {
    $scope.clock = new Date();
    $scope.current = $scope.in - $scope.out;
  }, 200);

}]);
