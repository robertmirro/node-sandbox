var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var es = require('event-stream');

// transpile coffee to js just to see what javaScriptFromCoffeeScript is produced below
gulp.task('coffee', function() {
    gulp.src('src/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('src'));
});

gulp.task('scripts', function() {
    var javaScriptFromCoffeeScript = gulp.src('src/*.coffee')
        .pipe(coffee());

    var javaScript = gulp.src('src/*.js');

    return /* gulp.src('src/*.js') */ es.merge(javaScriptFromCoffeeScript, javaScript)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);

