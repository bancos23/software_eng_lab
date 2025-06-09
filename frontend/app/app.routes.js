angular.module('app').config(function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'loginController',
        title: 'Login'
    });
});