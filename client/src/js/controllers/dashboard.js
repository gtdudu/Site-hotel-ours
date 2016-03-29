(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('privateController', PrivateController);

  PrivateController.$inject = ['$scope', '$location', '$routeParams', 'LoggedFactory'];

  function PrivateController($scope, $location, $routeParams, LoggedFactory){
    $scope.data = {
     on: LoggedFactory.isLogged,
     singleSelect: 'offres',
    };

    $scope.check = function(arg) {
      if (arg) {
        if ($scope.data.singleSelect == arg)
          return true;
      }
      return false;
    };
  }

})();
