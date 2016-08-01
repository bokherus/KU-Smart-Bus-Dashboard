
var app = angular.module('SmartBus', ['angularMoment', 'relativeDate', 'ngAnimate']);

app.controller('DashboardController', ['$scope', '$interval', '$http',
function($scope, $interval, $http) {

  var TOTAL_SEAT = 20;

  $scope.clock = new Date();
  $scope.in = 0;
  $scope.out = 0;
  $scope.seat_left = 0;
  $scope.reserved = false;
  $scope.reservation_text = "Reserve a  seat";
  $scope.reserve_status = "";
  $scope.color = 'green';
  $scope.background = 'lightgreen'

  $scope.historyList = [];

  $scope.setIn = function(amount) {
    if ($scope.in != 0) {
      for (var i = 0; i < amount - $scope.in ; i++) {
        $scope.addHistory("In", "green");
        console.log(i);
      }
    }
    $scope.in = amount;
  };

  $scope.setOut = function(amount) {
    if ($scope.out != 0) {
      for (var i = 0; i < amount - $scope.out ; i++) {
        $scope.addHistory("Out", "red");
        console.log(i);
      }
    }
    $scope.out = amount;
  }

  $scope.setReservationStatus = function(status) {
    reserved = status;
    if (status == 'true') {
      $scope.reservation_text = "Reserved";
      $scope.reserve_status = "disabled";
    } else {
      $scope.reservation_text = "Reserved a seat";
      $scope.reserve_status = "";
    }
  }

  $scope.reserveSeat = function() {
    $scope.reserved = true;
    $scope.reservation_text = "Reserving.."
    var result_string = $scope.in + ',' + $scope.out + ',' + $scope.color + ',' + $scope.reserved
    $http.get('http://10.32.176.4/staff_hardware/' + result_string)
      .then(function(response) {
        console.log(response.status);
        console.log(response.data);
      }, function(response) {
        console.log(response.status);
        console.log(response.data);
      });
  }

  $scope.retriveDataFromServer = function() {
    $http.get('http://10.32.176.4/staff_hardware')
      .then(function(response) {
          var data = response.data.split(",");
          $scope.setIn(data[0]);
          $scope.setOut(data[1]);
          $scope.color = data[2];
          $scope.background = "light" + data[2];
          $scope.setReservationStatus(data[3]);
          $scope.seat_left = TOTAL_SEAT - ($scope.in - $scope.out);
        }, function(response) {
          console.log(response.status);
          console.log(response.data);
        });
  }

  $scope.addHistory = function(message, color) {
    $scope.historyList.unshift({
      action: message,
      color: color,
      time: new Date()
    });
  };

  $interval(function() {
    $scope.clock = new Date();
    $scope.retriveDataFromServer();
  }, 1000);

}]);
