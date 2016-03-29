(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('privateController', PrivateController);

  PrivateController.$inject = ['$scope', '$location', '$routeParams', 'LoggedFactory', 'AuthFactory'];

  function PrivateController($scope, $location, $routeParams, LoggedFactory, AuthFactory){
    $scope.data = {
     on: LoggedFactory.isLogged,
     singleSelect: 'chambres',
    };

    $scope.check = function(arg) {
      if (arg) {
        if ($scope.data.singleSelect == arg)
          return true;
      }
      return false;
    };

    $scope.logout = function () {
      AuthFactory.logout();
    };
  }

})();
