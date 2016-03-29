(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('restoCtrl', RestoController);

  RestoController.$inject = ['$scope', '$modal'];

  function RestoController($scope, $modal){

    $scope.menu = 'menu/Carte-2015.pdf';

    $scope.selected = 'restaurant';

    $scope.option = ['restaurant', 'brasserie'];

    $scope.select= function(item) {
       $scope.selected = item;
    };

    $scope.isActive = function(item) {
       return $scope.selected === item;
    };

    $scope.open = function(){
      console.log('here');
      var modalInstance = $modal.open({
        size: 'lg',
        templateUrl: 'partials/resto-modal.html',
        controller: 'restoModalCtrl',
        resolve: {
          menu: function () {
            return $scope.menu;
          }
        }
      });
    };
  }

})();
