angular
.module('app')
.factory('videoService', function($http) {
    const BASE = 'http://localhost:3000/api/videos/';

    return {

        getAll : () => $http.get(BASE),

        create(video) {
            const fd = new FormData();
            fd.append('title', video.title);
            fd.append('categoryId', video.categoryId);
            fd.append('file', video.file);

            return $http.post(BASE, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        },

        update(data, id) {
            return $http.put(`${BASE}${id}`, data);
        },

        delete(id) {
            return $http.delete(`${BASE}${id}`);
        }
    };

});