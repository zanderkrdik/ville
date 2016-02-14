var
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    config = require('../config.js');

// '../../gruntfile.js',
// '../../package.json',
// '../../gulp/**/.js',
// config.dir.js.src

gulp.task('jshint', function () {
    return gulp.src(['package.json', 'gulpfile.js', config.dir.gulp, config.dir.js.src])
        .pipe(jshint(config.jshint))
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});