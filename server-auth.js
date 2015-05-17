/**
 * Created by Gerardo on 5/10/2015.
 */
var express = require('express'),
    User = require('./user'),
    jwt = require('jwt-simple'),
    bcrypt = require('bcrypt'),
    app = express();

app.use(require('body-parser').json());

var secretKey = 'supersecretkey';

app.post('/session', function (req, res, next) {
    User.findOne({username: req.body.username})
        .select('password')
        .exec(function (err, user) {

            if (err) {
                return next(err)
            }
            if (user == null) {
                return res.status(401).end();
            }
            bcrypt.compare(req.body.password, user.password, function (err, valid) {
                if (err) {
                    return next(err)
                }
                if (valid == false) {
                    return res.status(401).end();
                }
                var token = jwt.encode({username: user.username}, secretKey);
                res.status(201).json(token).end();
            });
        });
});

app.post('/user', function (req, res, next) {
    var user = new User({
        username: req.body.username,
    });
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        user.password = hash;
        user.save(function (err) {
            if (err) {
                throw next(err)
            }
            res.status(201).end();
        });
    });
});

app.get('/user', function (req, res, next) {
    var token = req.headers['x-auth'];
    var auth = jwt.decode(token, secretKey);
    User.findOne({
        username: auth.username
    }, function (err, user) {
        res.status(201).json(user).end();
    });
});

app.listen(3000, function () {
    console.log('Aplicacion en puerto 3000')
});