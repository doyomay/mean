/**
 * Created by Gerardo on 5/24/2015.
 */
var redis = require('redis'),
    client = redis.createClient();
client.on('error', function(err){
    console.log(err);
});

exports.publish = function(topic, data) {
    client.publish(topic,JSON.stringify(data));
};
exports.subscribe = function(topic, cb) {
    var client = redis.createClient();
    client.subscribe(topic);
    client.on('message', function(channel, message){
        cb(JSON.parse(message));
    });
};