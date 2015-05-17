/**
 * Created by Gerardo on 5/15/2015.
 */
angular.module('app')
.controller('ApplicationCtrl', function($scope) {
        $scope.$on('login', function(_, user) {
            $scope.currentUser = user;
        });
    });