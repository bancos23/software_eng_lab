angular.module('app')
.controller('videoController', function($scope, videoService, categoryService) {
    $scope.videos = [];
    $scope.categories = [];
    $scope.newVideo = {};

    $scope.getCategoryName = id => {
        const c = $scope.categories.find(c => c.ID === id);
        return c ? c.name : 'Unknown Category';
    };

    $scope.createVideo = () => {
        videoService.create($scope.newVideo).then(() => {
            $scope.newVideo = {};
            loadVideos();
            const fileInput = document.getElementById('fileInput');
            if(fileInput) fileInput.value = null;
        });
    };

    $scope.deleteVideo = video => 
        videoService.delete(video.ID).then(loadVideos);

    function loadVideos() {
        videoService.getAll().then(res => $scope.videos = res.data);
    }

    function loadCategories() {
        categoryService.getAll().then(res => $scope.categories = res.data);
    }

    loadCategories();
    loadVideos();

});