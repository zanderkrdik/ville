var
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    flatten = require('gulp-flatten'),
    clean = require('./clean.js'),
    glbs = require('../config.js').dir;

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var globby = require('globby');
var through = require('through2');
var gutil = require('gulp-util');







gulp.task('clean:js', () => clean(glbs.js.build));

gulp.task('-js', ['clean:js', 'jshint'], () =>
    gulp
        .src(glbs.js.src)
        .pipe(flatten())
        .pipe(gulp.dest(glbs.js.build))
        .pipe(browsersync.stream())
    );

// gulp.task('js', ['clean:js', 'jshint'], function () {
//   var b = browserify({
//     entries: glbs.js.src,
//     debug: true
//   });

//   return b.bundle()
//     .pipe(source('index.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//         // Add transformation tasks to the pipeline here.
//         //.pipe(uglify())
//         .on('error', gutil.log)
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest(glbs.js.build))
//         .pipe(browsersync.stream());
// });


gulp.task('js', function () {
  // gulp expects tasks to return a stream, so we create one here.
  var bundledStream = through();

  bundledStream
    // turns the output bundle stream into a stream containing
    // the normal attributes gulp plugins expect.
    .pipe(source('index.js'))
    // the rest of the gulp task, as you would normally write it.
    // here we're copying from the Browserify + Uglify2 recipe.
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add gulp plugins to the pipeline here.
      //.pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(glbs.js.build));

  // "globby" replaces the normal "gulp.src" as Browserify
  // creates it's own readable stream.
  globby(['./src/**/*.js']).then(function(entries) {
    // create the Browserify instance.
    var b = browserify({
      entries: entries,
      debug: true
      //transform: [reactify]
    });

    // pipe the Browserify stream into the stream we created earlier
    // this starts our gulp pipeline.
    b.bundle().pipe(bundledStream);
  }).catch(function(err) {
    // ensure any errors from globby are handled
    bundledStream.emit('error', err);
  });

  // finally, we return the stream, so gulp knows when this task is done.
  return bundledStream;
});