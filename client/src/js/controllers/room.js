(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('roomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$rootScope', '$scope', 'roomFactory', '$location', '$routeParams', 'LoggedFactory'];

  function RoomCtrl($rootScope, $scope, roomFactory, $location, $routeParams, LoggedFactory) {
    $scope.rooms = [];
    $scope.images = [];
    $scope.amnetiesfr = '';
    $scope.amnetiesen = '';


    $scope.getLang = function(obj, field) {
      return obj[field + $rootScope.lang];
    };

    $scope.init = function() {
      roomFactory.getRooms().then(function(data) {
        $scope.rooms = data.data;
      });
    };

    $scope.showContent = function($fileContent){
      $scope.content = $fileContent;
    };

    $scope.remove = function(room) {
      roomFactory.deleteRoom(room._id);
      var index = $scope.rooms.indexOf(room);
      $scope.rooms.splice(index, 1);
    };

    $scope.goToView = function(room) {
      $location.path('/chambres/' + room._id);
    };

    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        roomFactory.createRoom({
          typefr: $scope.roomTypeFr,
          contentfr: $scope.roomContentFr,
          pricefr: $scope.roomPriceFr,
          amnetiesfr: $scope.roomAmnetiesFr.split(','),
          typeen: $scope.roomTypeEn,
          contenten: $scope.roomContentEn,
          priceen: $scope.roomPriceEn,
          amnetiesen: $scope.roomAmnetiesEn.split(','),
          file: $scope.file
        }).then(function (success, error, progress) {
          if (success) {
            console.log($scope.rooms);
            $scope.rooms.push(success.data);
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

    $scope.update = function(room) {
        var updated = {
          _id: $scope.room._id,
          typefr: $scope.room.typefr,
          contentfr: $scope.room.contentfr,
          pricefr: $scope.room.pricefr,
          amnetiesfr: $scope.room.amnetiesfr,
          typeen: $scope.room.typeen,
          contenten: $scope.room.contenten,
          priceen: $scope.room.priceen,
          amnetiesen: $scope.room.amnetiesen,
          file: $scope.file
        };
      if ($scope.form.file.$valid && $scope.file) {
        roomFactory.updateRoomWithImg(updated).then(function (success, error, progress) {
          if (success) {
            roomFactory.getRoom($routeParams.id).then(function(data) {
              $scope.room = data.data;
              $scope.amnetiesfr = data.data.amnetiesfr.join(',');
              $scope.amnetiesen = data.data.amnetiesen.join(',');
            });
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
        roomFactory.updateRoom(updated).then(function(data){
          roomFactory.getRoom($routeParams.id).then(function(data) {
            $scope.room = data.data;
            $scope.amnetiesfr = data.data.amnetiesfr.join(',');
            $scope.amnetiesen = data.data.amnetiesen.join(',');
          });
        });

      }
    };

    $scope.findOne = function() {
      roomFactory.getRoom($routeParams.id).then(function(data) {
        $scope.room = data.data;
        $scope.amnetiesfr = data.data.amnetiesfr.join(',');
        $scope.amnetiesen = data.data.amnetiesen.join(',');
      });
    };

    $scope.$watch('amnetiesen', function(o, n){
      if (n && o !== n) {

        var arr = n.split(',');
        console.log(arr);
        $scope.room.amnetiesen.length = 0;
        $scope.room.amnetiesen = arr.splice(0);
      }
    });

    $scope.$watch('amnetiesfr', function(o, n){
      if (n && o !== n) {
        var arr = n.split(',');
        $scope.room.amnetiesfr.length = 0;
        $scope.room.amnetiesfr = arr.splice(0);
      }
    });


    $scope.isAdmin = function() {
      return LoggedFactory.userRole === 'admin';
    };
  }

})();
