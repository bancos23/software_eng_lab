angular.module('app').controller('mainController', function($scope) {
    $scope.isLoggedIn = function() {
        return !!sessionStorage.getItem('session_id');
    };
    
    
    $scope.isAdmin = function() {
        return sessionStorage.getItem('user_role') === 'admin';
    };

    $scope.isUser = function() {
        return sessionStorage.getItem('user_role') === 'user';
    };

     $scope.isUserHome = function() {
        return $location.path() === '/user';
    };

});
