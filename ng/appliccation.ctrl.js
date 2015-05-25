/**
 * Created by Gerardo on 5/15/2015.
 */
angular.module('app')
.controller('ApplicationCtrl', function($scope, UserSvc) {
        $scope.$on('login', function(_, user) {
            $scope.currentUser = user;
        });
        $scope.logout = function() {
            UserSvc.logout()
                .then(function(response) {
                    console.log(response);
                    $scope.currentUser = null;
                    sessionStorage.clear();
                });
        }

    });