(function(){
  'use strict';

  angular
    .module('ngclient')
    .factory('roomFactory', RoomFactory);

  RoomFactory.$inject = ['$http', 'Upload'];

  function RoomFactory($http, Upload){
    return {
      getRooms: function() {
        var url = 'https://localhost:5555/api/v1/rooms';
        return $http.get(url);
      },
      getRoom: function(id) {
        var url = 'https://localhost:5555/api/v1/room/' + id;
        return $http.get(url);
      },
      deleteRoom: function(id) {
        var url = 'https://localhost:5555/api/v1/admin/room/' + id;
        return $http.delete(url);
      },
      createRoom: function(room) {
        return Upload.upload({
            url: 'https://localhost:5555/api/v1/admin/room/',
            data: {
              file: room.file,
              typefr: room.typefr,
              contentfr: room.contentfr,
              amnetiesfr: room.amnetiesfr.splice(0),
              pricefr: room.pricefr,
              typeen: room.typeen,
              contenten: room.contenten,
              amnetiesen: room.amnetiesen.splice(0),
              priceen: room.priceen,
            }
        });
      },
      updateRoom: function(room) {
        console.log(room);
        var url = 'https://localhost:5555/api/v1/admin/room/' + room._id;
        return $http.put(url, {
          file: room.file,
          typefr: room.typefr,
          contentfr: room.contentfr,
          amnetiesfr: room.amnetiesfr.splice(0),
          pricefr: room.pricefr,
          typeen: room.typeen,
          contenten: room.contenten,
          amnetiesen: room.amnetiesen.splice(0),
          priceen: room.priceen,
         });
      },
      updateRoomWithImg: function(room) {
        console.log(room);

        return Upload.upload({
            url: 'https://localhost:5555/api/v1/admin/roomWithImg/' + room._id,
            data: {
              file: room.file,
              typefr: room.typefr,
              contentfr: room.contentfr,
              amnetiesfr: room.amnetiesfr.splice(0),
              pricefr: room.pricefr,
              typeen: room.typeen,
              contenten: room.contenten,
              amnetiesen: room.amnetiesen.splice(0),
              priceen: room.priceen,
            }
        });
      }
    };
  }

})();
