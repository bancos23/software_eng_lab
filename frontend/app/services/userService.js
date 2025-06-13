angular.module('app')
.factory('userService', function($http) {
    return {
        getAll: () => $http.get('http://localhost:3000/api/users/'),
        createUser: (user) => $http.post('http://localhost:3000/api/users/', user),
        updateUser: (user) => $http.put(`http://localhost:3000/api/users/${user.ID}`, user),
        deleteUser: (userId) => $http.delete(`http://localhost:3000/api/users/${userId}`)
    };
});