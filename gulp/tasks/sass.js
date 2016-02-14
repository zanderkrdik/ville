var
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    clean = require('./clean.js'),
    glbs = require('../config.json').dir;

gulp.task('clean:sass', () => clean(glbs.scss.build));

gulp.task('sass', ['clean:sass'], () =>
    gulp
        .src(glbs.scss.src)
        .pipe(sass({ includePaths: ['scss'] }))
        .pipe(gulp.dest(glbs.scss.build))
        .pipe(browsersync.stream())
    );
