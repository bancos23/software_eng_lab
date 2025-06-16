angular.module('app')
.controller('categoryController', function($scope, categoryService) {
    $scope.categories = [];

    $scope.newCategory = {};

    const loadCategories = () => {
        categoryService.getAll().then(res => {
            $scope.categories = res.data;
        });
    };

    $scope.createCategory = () => {
        categoryService.createCategory($scope.newCategory).then(() => {
            $scope.newCategory = {};
            loadCategories();
        });
    };

    $scope.editCategory = (category) => {
        category._backup = angular.copy(category);
        category.editing = true;
    };

    $scope.saveCategory = (category) => {
        categoryService.updateCategory(category).then(() => {
            category.editing = false;
            delete category._backup;
            loadCategories();
        });
    };

    $scope.cancelEdit = (category) => {
        angular.extend(category, category._backup);
        delete category._backup;
        category.editing = false;
    };

    $scope.deleteCategory = (category) => {
        categoryService.deleteCategory(category.ID).then(() => {
            loadCategories();
        });
    };

    loadCategories();
});
