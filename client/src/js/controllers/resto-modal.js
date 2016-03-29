(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('restoModalCtrl', RestoModalController);

  RestoModalController.$inject = ['$scope', '$modalInstance', 'menu'];

  function RestoModalController($scope, $modalInstance, menu){

    $scope.menu = menu;

    console.log($scope.menu);

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }

})();
