angular.module('app')
.factory('categoryService', function($http) {
    return {
        getAll: () => $http.get('http://localhost:3000/api/categories/'),
        createCategory: (category) => $http.post('http://localhost:3000/api/categories/', category),
        updateCategory: (category) => $http.put(`http://localhost:3000/api/categories/${category.ID}`, category),
        deleteCategory: (id) => $http.delete(`http://localhost:3000/api/categories/${id}`)
    };
});