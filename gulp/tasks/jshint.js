const
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    config = require('../config.js');

gulp.task('jshint', () =>
    gulp
        .src(['package.json', 'gulpfile.js', config.dir.gulp, config.dir.js.src])
        .pipe(jshint(config.jshint))
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
    );