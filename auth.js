/**
 * Created by Gerardo on 5/17/2015.
 */
var jwt = require('jwt-simple'),
    config = require('../config');

module.exports = function (req, res, next) {
    if(req.headers['x-auth']) {
        req.auth = jwt.decode(req.headers['x-auth'], config.secret);
    }
    next();
};