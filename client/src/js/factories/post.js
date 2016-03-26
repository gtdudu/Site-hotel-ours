(function(){
  'use strict';

  angular
    .module('ngclient')
    .factory('postFactory', PostFactory);

  PostFactory.$inject = ['$http'];

  function PostFactory($http){
    return {
      getPosts: function() {
        var url = 'https://localhost:5555/api/v1/posts';
        return $http.get(url);
      },
      getPost: function(id) {
        var url = 'https://localhost:5555/api/v1/post/' + id;
        return $http.get(url);
      },
      deletePost: function(id) {
        var url = 'https://localhost:5555/api/v1/admin/post/' + id;
        return $http.delete(url);
      },
      createPost: function(post) {
         console.log(post);
        var url = 'https://localhost:5555/api/v1/admin/post/';
        return $http.post(url, { title: post.title, content: post.content, images: post.images });
      },
      updatePost: function(post) {
        var url = 'https://localhost:5555/api/v1/admin/post/' + post._id;
        return $http.put(url, { title: post.title, content: post.content });
      }
    };
  }

})();
