/**
 * Created by Gerardo on 5/17/2015.
 */
angular.module('app')
    .controller('RegisterCtrl', function($scope, UserSvc) {
        $scope.createUser = function(username, password) {
            UserSvc.createUser(username,password)
                .then(function(response){
                    console.log(response);
                });
        };
    });