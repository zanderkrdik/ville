const
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    _ = require('underscore'),
    config = require('../config.js'),
    through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'jshint-code-rem';

const SKIPCODES = [
    'W097', //DESC: Use the function form of `use strict`.
    'W098', //DESC: '$' is defined but never used.
];


gulp.task('jshint', () =>
    gulp
        .src(['package.json', 'gulpfile.js', config.dir.gulp, config.dir.js.src])
        .pipe(jshint(config.jshint))
        .pipe(jshintCodeRem(SKIPCODES))
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
    );
    
// plugin level function (dealing with files)
function jshintCodeRem(skipcodes) {
  if (!skipcodes) {
      skipcodes = [];
  }

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
        file.jshint.results = _.filter(file.jshint.results, function(i) {
            return SKIPCODES.indexOf(i.error.code) === -1;
        });
    
        if (file.jshint.results.length === 0) {
        file.jshint.success = true;
        }
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
}

    