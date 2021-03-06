/**
 * Created by Gerardo on 5/11/2015.
 */
angular.module('app')
.service('UserSvc', function($http) {
        var svc = this;
        svc.getUser = function() {
            return $http.get('/api/users');
        };
        svc.login = function (username, password) {
            return $http.post('/api/sessions', {
                username : username,
                password : password
            }).then(function(val) {
                svc.token = val.data;
                $http.defaults.headers.common['X-Auth'] = val.data;
                return svc.getUser();
            });
        };
        svc.createUser = function(username, password) {
            return $http.post('/api/users', {
                username : username,
                password : password
            }).then(function(val) {
                console.log(val);
            });
        };
        svc.logout = function() {
            return $http.get('api/users/logout')
                .then(function(val){
                    console.log(val);
                });
        };
    });