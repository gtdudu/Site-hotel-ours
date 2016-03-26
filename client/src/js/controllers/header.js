(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('headerCtrl', HeaderCtrl);

    HeaderCtrl.$inject = ['$scope', '$window', '$location', 'AuthFactory', 'LoggedFactory'];

    function HeaderCtrl($scope, $window, $location, AuthFactory, LoggedFactory) {
      $scope.isActive = function(route) {
        return route === $location.path();
      };

      $scope.isAdmin = function() {
        return LoggedFactory.userRole === 'admin';
      };

      $scope.logout = function () {
        AuthFactory.logout();
      };

      $scope.scrollTo = function(id) {
          var $ = window.jQuery;
          var speed = 750; // Durée de l'animation (en ms)
          $('html, body').animate({scrollTop: $('#' + id).offset().top}, speed);
          return false;
      };
    }

})();
