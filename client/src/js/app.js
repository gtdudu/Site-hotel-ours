var myApp = angular.module('ngclient', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($routeProvider, $httpProvider, $locationProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      requiredLogin: false
    })
    .when('/login', {
      templateUrl: 'dashboard/user/login.html',
      controller: 'loginCtrl',
      requiredLogin: false
    })
    .when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'privateController',
      requiredLogin: true,
      requiredAdmin: true
    })
    .when('/chambres', {
      templateUrl: 'partials/room.html',
      controller: 'roomCtrl',
      requiredLogin: false
    })
    .when('/restaurant', {
      templateUrl: 'partials/resto.html',
      requiredLogin: false
    })
    .when('/offres', {
      templateUrl: 'partials/package.html',
      requiredLogin: false
    })
    .when('/privatiser', {
      templateUrl: 'partials/private.html',
      requiredLogin: false
    })
    .when('/tourisme', {
      templateUrl: 'partials/tourism.html',
      requiredLogin: false
    })
    .when('/venir', {
      templateUrl: 'partials/contact.html',
      requiredLogin: false
    })
    .when('/galerie', {
      templateUrl: 'partials/galerie.html',
      requiredLogin: false
    })
    .when('/forbidden', {
      templateUrl: 'error/unauthorized.html',
      requiredLogin: false
    })
    .otherwise({
      templateUrl: 'error/404.html',
      requiredLogin: false
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
      $location.path("/forbidden");
     }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = LoggedFactory.isLogged;

    if (LoggedFactory.isLogged === true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});
