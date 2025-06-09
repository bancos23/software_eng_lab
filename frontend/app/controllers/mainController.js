angular.module('app').controller('mainController', function($scope) {
    $scope.isLoggedIn = function() {
        return !!sessionStorage.getItem('session_id');
    };
});
