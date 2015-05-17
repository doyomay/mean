/**
 * Created by Gerardo on 5/9/2015.
 */
var Post = require('../../models/post'),
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
    publi.username = req.auth.username;
    publi.save(function (err, post) {
        if(err){ return next(err) }
        res.status(201).json(post);
    });
});

module.exports = router;
