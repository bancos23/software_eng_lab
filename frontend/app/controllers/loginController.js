angular.module('app')
.controller('loginController', function($scope, $http, $location, $timeout) {
    $scope.user = {};

    $scope.login = function() {
        $http.post('http://localhost:3000/api/auth/login', {
            user: $scope.user.username,
            passwd: $scope.user.password
        }).then(function(response) {
            sessionStorage.setItem('session_id', response.data.sessionId);
            $location.path('/');
        }).catch(function(error) {
            $scope.error = 'Invalid username or password';
            $timeout(function() {
                $scope.error = null;
            }, 5000);
        });
    };
});
