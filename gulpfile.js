const gulp = require('gulp')



gulp.task('run', function (cb) {
    gulp
    .src('./build')
    .pipe(gulp.dest('qq'));
});