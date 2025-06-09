angular.module('app', ['ngRoute'])

.run(function($rootScope, $location, $route) {
  $rootScope.$on('$routeChangeStart', function(event, next) {
    const sessionId = sessionStorage.getItem('session_id');
    const restrictedRoutes = ['/admin'];

    if (restrictedRoutes.includes(next.originalPath) && !sessionId) {
      event.preventDefault();
      $location.path('/login');
    }

    if (next.originalPath === '/logout') {
      sessionStorage.removeItem('session_id');
      event.preventDefault();
      $location.path('/');
    }
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.pageTitle = $route.current.title || 'App';
  });
});
