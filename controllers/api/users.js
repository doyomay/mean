/**
 * Created by Gerardo on 5/14/2015.
 */
var router = require('express').Router(),
    bcrypt = require('bcrypt'),
    jwt = require('jwt-simple'),
    User = require('../../models/user'),
    config = require('../../config');

router.get('/', function(req, res, next) {
    if(!req.headers['x-auth']) {
        return res.status(401).end();
    }
    var auth = jwt.decode(req.headers['x-auth'], config.secret);
    User.findOne({username:auth.username}, function(err, user) {
        if(err){return next(err)}
        res.status(201).json(user).end();
    });
});

router.post('/', function(req, res, next) {
    var user = new User({ username : req.body.username});
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err) {return next(err)}
        user.password = hash;
        user.save(function(err) {
            if(err){return next(err)}
            res.status(201).end();
        });
    });
});

router.get('/logout', function(req, res, next) {
    req.auth = null;
    res.status(201).json({
        msg : 'logout exit!'
    }).end();
});

module.exports = router;