/**
 * Created by Gerardo on 5/10/2015.
 */
var fs = require('fs'),
    gulp = require('gulp');

fs.readdirSync(__dirname + '/gulp').forEach( function(task){
    require('./gulp/'+ task);
});

gulp.task('dev',['watch:css','watch:js','dev:server']);