angular.module('app', ['ngRoute'])

.run(function($rootScope, $location, $route) {
  $rootScope.$on('$routeChangeStart', function(event, next) {
    const userRole = sessionStorage.getItem('user_role');
    
   if (next && next.originalPath && next.originalPath.startsWith('/admin') && userRole !== 'admin') {
      event.preventDefault();
      //$location.path('/login'); // or redirect to '/home' for users if preferred
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
