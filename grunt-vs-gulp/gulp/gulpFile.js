
var gulp = require('gulp');
var gulpUtil = require('gulp-util');

var less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('*.less')
        .pipe(less())
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['less']);