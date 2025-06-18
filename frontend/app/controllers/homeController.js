angular.module('app')
.controller('homeController', function($scope, videoService, categoryService, $location) {
    $scope.loading = true;
    $scope.error = null;
    $scope.categories = [];

    let token = sessionStorage.getItem('session_id');
    if (!token) {
        console.log('you re not logged in');
        $scope.error = 'You must be logged in to view this page.';
        $location.path('/login');
        return;
    }

    function loadData() {
        Promise.all([
            categoryService.getAll(),
            videoService.getAll()
        ]).then(([categoryRes, videoRes]) => {
            const categories = categoryRes.data;
            const videos = videoRes.data;

            $scope.categories = categories.map(cat => {
                return {
                    name: cat.name,
                    videos: videos.filter(video => video.categoryId === cat.ID)
                };
            });

            $scope.loading = false;
            $scope.$apply();
        }).catch(err => {
            console.error('Error loading data:', err);
            $scope.error = 'Failed to load videos. Please try again.';
            $scope.loading = false;
            $scope.$apply();
        });
    }

    loadData();
});
