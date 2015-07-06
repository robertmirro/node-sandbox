'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function() {
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(plumber())
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

// NOTE: plumber NEEDS to be located directly after .src()
gulp.task('compass', function() {
    gulp.src('app/scss/style.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'app/scss',
            require: ['susy']
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/scss/**/*.scss', ['compass']);
});

gulp.task('default', ['scripts', 'compass', 'watch']);