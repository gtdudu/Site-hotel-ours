(function(){
  'use strict';

  angular
    .module('ngclient')
    .factory('offreFactory', OffreFactory);

  OffreFactory.$inject = ['$http', 'Upload'];

  function OffreFactory($http, Upload){
    return {
      getOffres: function() {
        var url = 'https://localhost:5555/api/v1/offres';
        return $http.get(url);
      },
      getOffre: function(id) {
        var url = 'https://localhost:5555/api/v1/offre/' + id;
        return $http.get(url);
      },
      deleteOffre: function(id) {
        var url = 'https://localhost:5555/api/v1/admin/offre/' + id;
        return $http.delete(url);
      },
      createOffre: function(offre) {
        return Upload.upload({
            url: 'https://localhost:5555/api/v1/admin/offre/',
            data: {file: offre.file, title: offre.title, content: offre.content}
        });
      },
      updateOffre: function(offre) {
        console.log(offre);
        var url = 'https://localhost:5555/api/v1/admin/offre/' + offre._id;
        return $http.put(url, { title: offre.title, content: offre.content, image: offre.image });
      },
      updateOffreWithImg: function(offre) {
        console.log(offre);
        
        return Upload.upload({
            url: 'https://localhost:5555/api/v1/admin/offreWithImg/' + offre._id,
            data: {file: offre.file, title: offre.title, content: offre.content}
        });
      }
    };
  }

})();
