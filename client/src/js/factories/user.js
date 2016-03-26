(function(){
  'use strict';

  angular
    .module('ngclient')
    .factory('userFactory', UserFactory);

  UserFactory.$inject = ['$http'];

  function UserFactory($http){
    return {
      getUsers: function() {
        var url = 'https://localhost:5555/api/v1/admin/users';
        return $http.get(url);
      },
      deleteUser: function(id) {
        var url = 'https://localhost:5555/api/v1/admin/user/' + id;
        return $http.delete(url);
      }
    };
  }

})();
