/**
 * Created by Gerardo on 5/10/2015.
 */
angular.module('app')
    .service('PostsSvc',function($http) {
        this.fetch = function () {
            return $http.get('/api/posts');
        };
        this.create = function(post){
            return $http.post('/api/posts',post);
        };
    });