/**
 * Created by Gerardo on 5/9/2015.
 */
var Post = require('../../models/post'),
    websockets = require('../../websockets'),
    pubsub = require('../../pubsub'),
    router = require('express').Router();

router.get('/', function(req, res, next){
    Post.find()
        .sort('-date')
        .exec(function(err, posts){
            if(err) {return next(err)}
            res.status(201).json(posts);
        });
});

router.post('/', function (req, res, next) {
    var publi = new Post({ body: req.body.body});
    if(req.auth != undefined || req.auth != null) {

        publi.username = req.auth.username;
        publi.save(function (err, post) {
            if(err){ return next(err) }
            pubsub.publish('new_post',post);
            pubsub.subscribe('new_post', function(post){
                websockets.broadcast('new_post',post);
            });
            /*websockets.broadcast('new_post',post);
            res.status(201).json(post);*/
        });

    }else {
        res.status(401).json({
            msg : 'please login firts!'
        });
    }
});

module.exports = router;
