angular.module('app')
.controller('loginController', function($scope, $http, $location, $timeout) {
    $scope.user = {};

    $scope.login = function() {
        $http.post('http://localhost:3000/api/auth/login', {
            user: $scope.user.username,
            passwd: $scope.user.password
        }).then(function(response) { 
            sessionStorage.setItem('session_id', response.data.sessionId);
            sessionStorage.setItem('user_role', response.data.role.toLowerCase());

            if (response.data.role.toLowerCase() === 'admin')
                $location.path('/admin');
            else 
                $location.path('/home');
        
        }).catch(function(error) {
            $scope.error = error.data.error || 'Login failed. Please try again.';
            $timeout(function() {
                $scope.error = null;
            }, 5000);
        });
    };
});
