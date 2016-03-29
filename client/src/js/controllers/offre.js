(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('offreController', OffreController);

  OffreController.$inject = ['$rootScope', '$scope', 'offreFactory', '$location', '$routeParams', 'LoggedFactory'];

  function OffreController($rootScope, $scope, offreFactory, $location, $routeParams, LoggedFactory) {
    $scope.offres = [];
    $scope.images = [];

    $scope.getLang = function(obj, field) {
      return obj[field + $rootScope.lang];
    };

    $scope.init = function() {
      offreFactory.getOffres().then(function(data) {
        $scope.offres = data.data;
        console.log(data);
      });
    };

    $scope.showContent = function($fileContent){
      $scope.content = $fileContent;
    };

    $scope.remove = function(offre) {
      offreFactory.deleteOffre(offre._id);
      var index = $scope.offres.indexOf(offre);
      $scope.offres.splice(index, 1);
    };

    $scope.edit = function(offre) {
      console.log(offre);
    };

    $scope.goToView = function(offre) {
      $location.path('/offre/' + offre._id);
    };

    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        offreFactory.createOffre({
          titlefr: $scope.offreTitleFr,
          contentfr: $scope.offreContentFr,
          titleen: $scope.offreTitleEn,
          contenten: $scope.offreContentEn,
          file: $scope.file
        }).then(function (success, error, progress) {
          if (success) {
            console.log($scope.offres);
            $scope.offres.push(success.data);
            console.log('Success ' + success.config.data.file.name + ' uploaded. Response: ' + JSON.stringify(success.data));
          }
          if (error){
            console.log('Error status: ' + error.status);

          }
          if (progress) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          }
        });
      }
    };

    $scope.update = function(offre) {
        var updated = {
          _id: $scope.offre._id,
          titlefr: $scope.offre.titlefr,
          contentfr: $scope.offre.contentfr,
          titleen: $scope.offre.titleen,
          contenten: $scope.offre.contenten,
          file: $scope.file
        };
      if ($scope.form.file.$valid && $scope.file) {
        offreFactory.updateOffreWithImg(updated).then(function (success, error, progress) {
          if (success) {
            $scope.offres.push(success.data);
            console.log('Success ' + success.config.data.file.name + ' uploaded. Response: ' + JSON.stringify(success.data));
          }
          if (error){
            console.log('Error status: ' + error.status);

          }
          if (progress) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          }
        });
      } else {
        offreFactory.updateOffre(updated);

      }
    };

    $scope.findOne = function() {
      offreFactory.getOffre($routeParams.id).then(function(data) {
        $scope.offre = data.data;
      });
    };

    $scope.isAdmin = function() {
      return LoggedFactory.userRole === 'admin';
    };

  }

})();
