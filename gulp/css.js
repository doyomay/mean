/**
 * Created by Gerardo on 5/10/2015.
 */
var gulp = require('gulp'),
    stylus = require('gulp-stylus');

gulp.task('css', function () {
    gulp.src('css/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('assets'))
});

gulp.task('watch:css', function () {
    gulp.watch('css/*.styl',['css']);
});