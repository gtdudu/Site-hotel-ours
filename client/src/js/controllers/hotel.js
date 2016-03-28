(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('hotelCtrl', HotelCtrl);

    HotelCtrl.$inject = ['$scope', '$window'];

    function HotelCtrl($scope, $window) {
      // $scope.notif = {
      //   msg: 'fzae',
      //   class: 'failure',
      //   show: function() {
      //     if (this.msg !== '')
      //       return true;
      //     return false;
      //   }
      // };
      // $scope.user = $window.sessionStorage.user;
      // $scope.role = $window.sessionStorage.userRole;
    }

})();
