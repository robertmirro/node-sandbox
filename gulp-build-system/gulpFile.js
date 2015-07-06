'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('scripts', function() {
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);