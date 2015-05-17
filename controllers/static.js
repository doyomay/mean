/**
 * Created by Gerardo on 5/9/2015.
 */
var express = require('express');
var router = require('express').Router();

router.use(express.static(__dirname + '/../templates'));
router.use(express.static(__dirname + '/../assets'));

router.get('*', function(req, res, next){
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
});

module.exports = router;