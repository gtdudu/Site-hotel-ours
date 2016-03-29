(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('offreController', OffreController);

  OffreController.$inject = ['$scope', 'offreFactory', '$location', '$routeParams', 'LoggedFactory'];

  function OffreController($scope, offreFactory, $location, $routeParams, LoggedFactory) {
    $scope.offres = [];
    $scope.images = [];

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

    $scope.goToCreate = function() {
      $location.path('/offre/create');
    };

    $scope.goToEdit = function(offre) {
      $location.path('/offre/' + offre._id + '/edit');
    };

    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        offreFactory.createOffre({
          title: $scope.offreTitle,
          content: $scope.offreContent,
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
      console.log(offre);
      if ($scope.form.file.$valid && $scope.file) {
        offreFactory.updateOffreWithImg({
          _id: $scope.offre._id,
          title: $scope.offre.title,
          content: $scope.offre.content,
          file: $scope.file
        }).then(function (success, error, progress) {
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
        offreFactory.updateOffre(offre);

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
