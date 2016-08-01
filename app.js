
var app = angular.module('SmartBus', ['angularMoment', 'relativeDate', 'ngAnimate']);

app.controller('DashboardController', ['$scope', '$interval', function($scope, $interval) {

  $scope.clock = new Date();
  $scope.in = Math.round(Math.random() * 100);
  $scope.out = Math.round(Math.random() * 100);
  $scope.current;

  $scope.historyList = [];

  $scope.addPassenger = function() {
    $scope.in++;
  };

  $scope.removePassenger = function() {
    $scope.out++;
  };

  $scope.addHistory = function() {
    console.log("ASDAS");
    $scope.historyList.unshift({
      action: 'new' + Math.round(Math.random() * 100),
      time: new Date()
    });
  };

  $interval(function() {
    $scope.clock = new Date();
    $scope.current = $scope.in - $scope.out;
  }, 200);

}]);
