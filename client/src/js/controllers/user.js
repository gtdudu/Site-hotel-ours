(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('userController', UserController);

  UserController.$inject = ['$scope', 'userFactory', '$location', '$routeParams'];

  function UserController($scope, userFactory, $location, $routeParams) {
    $scope.users = [];

    $scope.init = function() {
      userFactory.getUsers().then(function(data) {
        $scope.users = data.data;
      });
    };

    $scope.remove = function(user) {
      userFactory.deleteUser(user._id);
      var index = $scope.users.indexOf(user);
      $scope.users.splice(index, 1);
    };
  }

})();
