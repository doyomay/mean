/**
 * Created by Gerardo on 5/10/2015.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function(){
    gulp.src(['ng/module.js','ng/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'))
});

gulp.task('watch:js',['js'], function() {
    gulp.watch('ng/**/.js',['js']);
});