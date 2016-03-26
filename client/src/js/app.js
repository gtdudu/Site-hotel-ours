var myApp = angular.module('ngclient', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($routeProvider, $httpProvider, $locationProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'user/login.html',
      controller: 'loginCtrl',
      requiredLogin: false
    })
    .when('/', {
      redirectTo:'/hotel'
    })
    .when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'privateController',
      requiredLogin: true,
      requiredAdmin: true
    })
    .when('/hotel', {
      templateUrl: 'hotel/hotel.html',
      controller: 'hotelCtrl',
    })
    .when('/chambres', {
      templateUrl: 'room/room.html',
      controller: 'roomCtrl',
    })
    .when('/gallery/:id', {
      templateUrl: 'gallery/gallery-view.html',
      controller: 'galleryController',
      requiredLogin: false
    })
    .when('/post/:id', {
      templateUrl: 'post/post-view.html',
      controller: 'postController',
      requiredLogin: false
   })
    .when('/post/:id/edit', {
      templateUrl: 'post/post-edit.html',
      controller: 'postController',
      requiredLogin: true
    })
    .when('/nop', {
      templateUrl: 'error/unauthorized.html',
      requiredLogin: false
    })
    .otherwise({
      templateUrl: 'error/404.html'
    });

    // use the HTML5 History API
    // this is used to remove '#' from url
    // this works because <base href="/"> is defined in head
    // and server serves index.html on every route
    $locationProvider.html5Mode(true);

});

myApp.run(function($rootScope, $window, $location, LoggedFactory) {

  LoggedFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if (nextRoute.requiredLogin && !LoggedFactory.isLogged) {
      $location.path("/login");
     }
    if (nextRoute.requiredAdmin && LoggedFactory.userRole !== 'admin') {
      $location.path("/nop");
     }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = LoggedFactory.isLogged;

    if (LoggedFactory.isLogged === true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});
