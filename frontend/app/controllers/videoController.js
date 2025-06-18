angular.module('app')
.controller('videoController', function($scope, videoService, categoryService, $http) {
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

    $scope.editVideo = video => {
        video._backup = angular.copy(video);
        video.editing = true;
    };

    $scope.saveVideo = video => {
        if(video.newFile) {
            const fd = new FormData();
            fd.append('title', video.title);
            fd.append('categoryId', video.categoryId);  
            fd.append('file', video.newFile);

            $http.put(`http://localhost:3000/api/videos/${video.id}`, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(() => {
                video.editing = false;
                video.newFile = null;
                delete video._backup;
                delete video.newFile;
                loadVideos();
            });
        } else {
            videoService.update({
                title: video.title, 
                categoryId: video.categoryId
            }, video.id)
            .then(() => {
                video.editing = false;
                delete video._backup;
                loadVideos();
            }).catch(err => {
                console.error('Error updating video:', err);
                alert('Failed to update video. Please try again.');
            });
        }
    };

    $scope.cancelEdit = video => {
        if(video._backup) {
            Object.assign(video, video._backup);
            delete video._backup;
        }
        video.editing = false;
        delete video.newFile;
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