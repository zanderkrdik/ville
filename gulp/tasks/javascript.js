var
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    flatten = require('gulp-flatten'),
    clean = require('./clean.js'),
    glbs = require('../config.js').dir;

gulp.task('clean:js', () => clean(glbs.js.build));

gulp.task('js', ['clean:js'], () =>
    gulp
        .src(glbs.js.src)
        .pipe(flatten())
        .pipe(gulp.dest(glbs.js.build))
        .pipe(browsersync.stream())
    );
