/**
 * Created by Gerardo on 5/9/2015.
 */
var express = require('express');
var router = require('express').Router();

router.use(express.static(__dirname + '/../templates'));
router.use(express.static(__dirname + '/../assets'));
var routers = ['/','/register','/login'];
router.get('*', function(req, res, next){
    console.log('url => ' + req.url);
    if(routers.indexOf( req.url)>= 0 ) {
        var options = {
            root: 'layouts',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        res.sendFile('app.html', options, function(err){
            if(err){
                next(err);
            }
        });
    }else {
        var options = {
            root: 'layouts',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true,
                'status' : 404
            }
        };
        res.sendFile('404.html', options, function(err){
            if(err){
                next(err);
            }
        });
    }
});

module.exports = router;