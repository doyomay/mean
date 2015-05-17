/**
 * Created by Gerardo on 5/10/2015 */
angular.module('app')
    .controller('PostsCtrl', function ($scope, PostsSvc) {
        $scope.addPost = function () {
            if ($scope.postBody) {
                PostsSvc.create({
                    username: 'doyomay',
                    body: $scope.postBody
                }).success(function (post) {
                    $scope.posts.unshift(post);
                    $scope.postBody = null;
                });
            }
        };
        PostsSvc.fetch().success(function (posts) {
            $scope.posts = posts;
        });
    });