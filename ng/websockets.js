/**
 * Created by Gerardo on 5/17/2015.
 */
angular.module('app')
.run(function($rootScope, $timeout){
        (function connect(){
            var url = 'ws://localhost:3000';
            var connection = new WebSocket(url);
            connection.onopen = function() {
                console.log('conectado a websocket');
            };
            connection.onmessage = function(e){
                console.log(e);
                var payload = JSON.parse(e.data);
                $rootScope.$broadcast('ws:'+payload.topic, payload.data);
            };
            connection.onclose = function(e) {
                console.log('WebScoket closed. Reconnection ...');
                $timeout(connect,10*1000);
            }
        })();

    });