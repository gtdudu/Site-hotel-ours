(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('roomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$scope', '$window'];

  function RoomCtrl($scope, $window) {
    $scope.test = 'just testing';
  }

})();
