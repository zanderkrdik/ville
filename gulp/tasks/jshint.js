const
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    map = require('map-stream'),
    config = require('../config.js');

// Implement a filter 
var exitOnJshintError = map(function (file, cb) {
  if (!file.jshint.success) {
    console.error('jshint failed');
  }
  
  return cb();
});



gulp.task('jshint', () =>
    gulp
        .src(['package.json', 'gulpfile.js', config.dir.gulp, config.dir.js.src])
        .pipe(jshint(config.jshint))
//        .pipe(exitOnJshintError)
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
    );