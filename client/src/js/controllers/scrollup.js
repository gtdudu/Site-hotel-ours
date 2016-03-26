(function () {
'use strict';

  angular
    .module('ngclient')
    .controller('scrollupController', ScrollupController);

  ScrollupController.$inject = ['$scope', '$location', '$routeParams', 'LoggedFactory'];

  function ScrollupController($scope, $location, $routeParams, LoggedFactory){
    var $ = window.jQuery;

    //hide or display arrow depending on current scroll
    window.addEventListener("scroll", function() {
      if (this.scrollY > 200) {
        $('#Layer_1').css({ 'opacity' : 1 });
      } else {
        $('#Layer_1').css({ 'opacity' : 0 });
      }
    });

    $scope.scroll = function() {
      var speed = 750; // Durée de l'animation (en ms)
      $('html, body').animate({scrollTop: 0}, speed);
      return false;
    };
  }
})();
