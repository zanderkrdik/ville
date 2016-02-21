'use strict';

const
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    _ = require('underscore'),
    nodeResolve = require('resolve'),
    clean = require('./clean.js'),
    glbs = require('../config.js').dir,
    pkg = require('../../package.json');
    
    //TODO: Make sure that the app packages all resolve to the same names in the bundle
    

const VENDORBUILDFILENAME = 'vendor.js';
const BUILDFILENAME = 'index.js';

gulp.task('browserify', ['jshint', 'browserify:app', 'browserify:vendor']);

gulp.task('clean:browserify:vendor', () => clean(glbs.js.build + VENDORBUILDFILENAME));

gulp.task('browserify:vendor', ['clean:browserify:vendor'],  () => {

    let browse = browserify({
        debug: true
    });

    (_.keys(pkg.dependencies) || []).forEach((id) => {
        let nid = nodeResolve.sync(id);
        gutil.log('browserify:vendor adding: ' + (nid.indexOf('/') > -1 ? nid.substr(nid.lastIndexOf('/') + 1) : nid));
        browse.require(nid, { expose: id });
    });


    let browse$ = browse
        .bundle()
        .on('error', (err) => {
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source(VENDORBUILDFILENAME));

    browse$.pipe(gulp.dest(glbs.js.build));

    return browse$;
});

gulp.task('clean:browserify:app', () => clean(glbs.js.build + BUILDFILENAME));

gulp.task('browserify:app', ['clean:browserify:app'], function () {

    let browse = browserify('src/index.js',{
        debug: true
    });

    (_.keys(pkg.dependencies) || []).forEach( (id) => {
        let nid = nodeResolve.sync(id);
        gutil.log('browserify:app removing: ' + (nid.indexOf('/') > -1 ? nid.substr(nid.lastIndexOf('/') + 1) : nid));
        browse.external(id, { expose: nid });
    });



    let browse$ = browse
        .bundle()
        .on('error', (err) => {
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source(BUILDFILENAME));

    browse$.pipe(gulp.dest(glbs.js.build));

    return browse$;
    
});