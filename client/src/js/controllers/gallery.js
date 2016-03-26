(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('galleryController', GalleryController);

  GalleryController.$inject = ['$scope', 'galleryFactory', '$location', '$routeParams', 'LoggedFactory'];

  function validateFileType(file) {
    if (file.type.match(/image.*/)) {
      var allowedTypes = ['png', 'jpg', 'jpeg'];
      var fileType = file.name.split('.');
      fileType = fileType[fileType.length - 1];
      if(allowedTypes.indexOf(fileType) != -1)
      return true;
    }
    return false;
  }

  function resizeImage(dataUrl, max_height, max_width) {
    var img = document.createElement("img");
    img.src = dataUrl;

    var width = img.width;
    var height = img.height;
    var scale = Math.min(max_height / width, max_width / height);
    if (scale < 1) {
      height *= scale;
      width *= scale;
    }
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    return canvas;
  }

  function getPic(pic, arr) {
    if (validateFileType(pic)) {
      var reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.addEventListener('load', function() {
        var canvas = resizeImage(this.result, 200, 200);
        arr.push(this.result);
      }, false);
    }
  }

  function GalleryController($scope, galleryFactory, $location, $routeParams, LoggedFactory) {
    $scope.myInterval = 3000;
    $scope.images = [];
    $scope.galleries = [];

    $scope.init = function() {
      galleryFactory.getGalleries().then(function(data) {
        $scope.galleries = data.data;
        if (data.data.length) {
          $scope.selected = data.data[0];
        }
      });
    };

    $scope.slice = function() {
      return;
    };

    $scope.class = function(i) {
      return i == $scope.selected._id ? 'active' : '';
    };

    $scope.select = function(src) {
      $scope.selected = src;
    };

    $scope.findOne = function() {
      galleryFactory.getGallery($routeParams.id).then(function(data) {
        $scope.gallery = data.data;
      });
    };

    $scope.create = function(err, res) {
      var gallery = {};
      gallery.title = $scope.galleryTitle;
      gallery.images = $scope.images;
      galleryFactory.createGallery(gallery);
      $location.path('/galleries');
    };

    $scope.imageUpload = function(event) {
      var files = event.target.files; //FileList object

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        getPic(file, $scope.images);
      }

    };

    $scope.goToView = function(gallery) {
      $location.path('/gallery/' + gallery._id);
    };

    $scope.isAdmin = function() {
      return LoggedFactory.userRole === 'admin';
    };
  }

})();
