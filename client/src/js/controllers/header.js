(function(){
  'use strict';

  angular
    .module('ngclient')
    .controller('headerCtrl', HeaderCtrl);

    HeaderCtrl.$inject = ['$rootScope', '$scope', '$window', '$location', 'AuthFactory', 'LoggedFactory'];

    function HeaderCtrl($rootScope, $scope, $window, $location, AuthFactory, LoggedFactory) {

      $scope.getLang = function(obj) {
        return obj[$rootScope.lang];
      };

      $scope.menu = [
        {
          fr: 'chambres',
          en: 'room',
          link: '/chambres'
        },
        {
          fr: 'restaurant',
          en: 'restaurant',
          link: '/restaurant'
        },
        {
          fr: 'offres',
          en: 'packages',
          link: '/offres'
        },
        {
          fr: 'privatiser',
          en: 'rent',
          link: '/privatiser'
        },
        {
          fr: 'tourisme',
          en: 'around',
          link: '/tourisme'
        },
        {
          fr: 'galerie',
          en: 'gallery',
          link: '/galerie'
        },
        {
          fr: 'venir',
          en: 'come',
          link: '/venir'
        }
      ];

      $scope.isActive = function(route) {
        return route === $location.path();
      };

      $scope.isAdmin = function() {
        return LoggedFactory.userRole === 'admin';
      };

      $scope.logout = function () {
        AuthFactory.logout();
      };

      $scope.scrollTo = function(id) {
          var $ = window.jQuery;
          var speed = 750; // Durée de l'animation (en ms)
          $('html, body').animate({scrollTop: $('#' + id).offset().top}, speed);
          return false;
      };

      $scope.changeLang = function(lang) {
        if (lang === 'en')
          $rootScope.lang = 'en';
        else {
          $rootScope.lang = 'fr';
        }
        console.log($rootScope.lang);
      };
    }

})();
