angular.module('app', ['ngRoute']);

angular.module('app').run(function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.pageTitle = $route.current.title || 'App';
    });
});
