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
    .when('/admin/users', {
      templateUrl: 'app/views/users.html',
      controller: 'userController',
      title: 'User Management'
    })
    .when('/admin/categories', {
      templateUrl: 'app/views/categories.html',
      controller: 'categoryController',
      title: 'Category Management'
    })
    .when('/admin/videos', {
      templateUrl: 'app/views/videos.html',
      controller: 'videoController',
      title: 'Video Management'
    })

    .when('/logout', {
      template: '<p>Logging out...</p>',
      controller: 'logoutController',
      title: 'Logout'
    })

    .when('/home', {
            templateUrl: 'app/views/home.html',
            controller: 'homeController'
        })


    .otherwise({
      redirectTo: '/login'
    });
});
