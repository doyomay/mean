/**
 * Created by Gerardo on 5/9/2015.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social',function (){
    console.log('mongo connected');
});
module.exports = mongoose;