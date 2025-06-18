angular.module('app', ['ngRoute'])
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        const token = sessionStorage.getItem('session_id');
        if (token)
          config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      }
    };
  });
})
.run(function($rootScope, $location, $route) {
  $rootScope.$on('$routeChangeStart', function(event, next) {
    const userRole = sessionStorage.getItem('user_role');
    
   if (next.originalPath.startsWith('/admin') && userRole !== 'admin') {
      event.preventDefault();
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
