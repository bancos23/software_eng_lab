angular.module('app').config(function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/views/login.html',
      controller: 'loginController',
      title: 'Login'
    })
    .when('/admin', {
      templateUrl: 'app/views/admin.html',
      controller: 'adminController',
      title: 'Admin Panel'
    })
    .when('/logout', {
      template: '<p>Logging out...</p>', // Optional placeholder
      title: 'Logout'
    })
    .otherwise({
      templateUrl: 'app/views/home.html',
      controller: 'mainController',
      redirectTo: '/'
    });
});
