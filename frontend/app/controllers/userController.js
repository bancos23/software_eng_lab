angular.module('app')
.controller('userController', function($scope, userService) {
    $scope.users = [];

    $scope.newUser = {
        role: 'user'
    };

    const loadUsers = () => {
        userService.getAll().then(res => {
            $scope.users = res.data;
        });
    };

    $scope.createUser = () => {
        userService.createUser($scope.newUser).then(() => {
            $scope.newUser = {};
            loadUsers();
        });
    };

    $scope.editUser = (user) => {
        user._backup = angular.copy(user);
        user.editing = true;
    };

    $scope.saveUser = (user) => {
        userService.updateUser(user).then(() => {
            user.editing = false;
            delete user._backup;
            loadUsers();
        });
    };

    $scope.cancelEdit = (user) => {
        angular.extend(user, user._backup);
        delete user._backup;
        user.editing = false;
    };

    $scope.deleteUser = (user) => {
        userService.deleteUser(user.ID).then(() => {
            loadUsers();
        });
    };

    // Initial load
    loadUsers();
});