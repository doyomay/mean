/**
 * Created by Gerardo on 5/11/2015.
 */
angular.module('app')
.controller('LoginCtrl', function($scope, UserSvc) {
        $scope.login = function(username, password) {
            UserSvc.login(username,password)
                .then(function(response){
                    $scope.$emit('login', response.data);
                    sessionStorage.setItem('username',response.data);
                });
        };
    });