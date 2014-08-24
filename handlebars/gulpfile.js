var gulp = require('gulp');
var browserify = require('gulp-browserify');

var hbsfy = require("hbsfy").configure({
    extensions: ["html"]
});

gulp.task('scripts', function() {
    gulp.src('external_template_gulp.js')
        .pipe(browserify({
            transform: [hbsfy]
        }))
        .pipe(gulp.dest('./built/'));
});

// default gulp task
gulp.task('default', ['scripts']);
