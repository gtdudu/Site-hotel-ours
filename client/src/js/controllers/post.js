(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('postController', PostController);

  PostController.$inject = ['$scope', 'postFactory', '$location', '$routeParams', 'LoggedFactory'];

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

  function PostController($scope, postFactory, $location, $routeParams, LoggedFactory) {
    $scope.posts = [];
    $scope.images = [];

    $scope.init = function() {
      postFactory.getPosts().then(function(data) {
        $scope.posts = data.data;
        console.log(data);
      });
    };

    $scope.showContent = function($fileContent){
      $scope.content = $fileContent;
    };

    $scope.remove = function(post) {
      postFactory.deletePost(post._id);
      var index = $scope.posts.indexOf(post);
      $scope.posts.splice(index, 1);
    };

    $scope.edit = function(post) {
      console.log(post);
    };

    $scope.goToView = function(post) {
      $location.path('/post/' + post._id);
    };

    $scope.goToCreate = function() {
      $location.path('/post/create');
    };

    $scope.goToEdit = function(post) {
      $location.path('/post/' + post._id + '/edit');
    };

    $scope.create = function(err, res) {
      var post = {};
      post.title = $scope.postTitle;
      post.content = $scope.postContent;
      post.images = $scope.images[0];
      postFactory.createPost(post);
      $location.path('/posts');
    };

    $scope.update = function(post) {
      postFactory.updatePost(post);
      $location.path('/posts');
    };

    $scope.findOne = function() {
      postFactory.getPost($routeParams.id).then(function(data) {
        $scope.post = data.data;
      });
    };

    $scope.isAdmin = function() {
      return LoggedFactory.userRole === 'admin';
    };

    $scope.imageUpload = function(event) {
      var files = event.target.files; //FileList object

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        getPic(file, $scope.images);
      }
    };
  }

})();
