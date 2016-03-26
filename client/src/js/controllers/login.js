(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('loginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$window', '$location', 'AuthFactory', 'LoggedFactory'];

  function LoginCtrl($scope, $window, $location, AuthFactory, LoggedFactory) {
    $scope.login = function() {

      var username = $scope.username;
      var password = $scope.password;

      if (username !== undefined && password !== undefined) {
        AuthFactory.login(username, password).success(function(data) {

          LoggedFactory.isLogged = true;
          LoggedFactory.user = data.user.username;
          LoggedFactory.userRole = data.user.role;

          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.username;
          $window.sessionStorage.userRole = data.user.role;

          $location.path("/");

        }).error(function(status) {
          console.log('Noooooooooo, something went wrong!');
        });
      } else {
        console.log("Can't get in there buddy, invalid credentials...");
      }
    };
  }

})();
