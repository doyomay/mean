/**
 * Created by Gerardo on 5/9/2015.
 */
var db = require('../db'),
    Post = db.model('Post',{
        username: { type: String, required: true},
        body:    { type: String, required: true},
        date:    { type: Date, required: true, default : Date.now}
    });
module.exports = Post;