(function(){
  'use strict';

  angular
    .module('ngclient')
    .factory('galleryFactory', GalleryFactory);

  GalleryFactory.$inject = ['$http'];

  function GalleryFactory($http){
    return {
      getGalleries: function() {
        var url = 'https://localhost:5555/api/v1/galleries';
        return $http.get(url);
      },
      getGallery: function(id) {
        var url = 'https://localhost:5555/api/v1/gallery/' + id;
        return $http.get(url);
      },
      deleteGallery: function(id) {
        var url = 'https://localhost:5555/api/v1/admin/gallery/' + id;
        return $http.delete(url);
      },
      createGallery: function(gallery) {
        var url = 'https://localhost:5555/api/v1/admin/gallery/';
        return $http.post(url, { title: gallery.title, images: gallery.images });
      },
      updateGallery: function(gallery) {
        var url = 'https://localhost:5555/api/v1/admin/gallery/' + gallery._id;
        return $http.put(url, { title: gallery.title, images: gallery.images });
      }
    };
  }

})();
