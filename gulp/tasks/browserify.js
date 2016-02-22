'use strict';

const
    gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
//    sourcemaps = require('gulp-sourcemaps'),
    _ = require('underscore'),
    nodeResolve = require('resolve'),
    clean = require('./clean.js'),
    glbs = require('../config.js').dir,
    pkg = require('../../package.json');
    
    //TODO: Make sure that the app packages all resolve to the same names in the bundle
    

const VENDORBUILDFILENAME = 'vendor.js';
const BUILDFILENAME = 'index.js';

// Finds the vendor scripts based on Node Require resolution.
let vendorkeys = [];

var GenVendorKeys = function() {
    (_.keys(pkg.dependencies) || []).forEach( (id) => {
        let nid = nodeResolve.sync(id);
        gutil.log('browserify:app vendorizing: ' + (nid.indexOf('/') > -1 ? nid.substr(nid.lastIndexOf('/') + 1) : nid));
        vendorkeys.push({id, nid});
    });
};

gulp.task('browserify', ['jshint', 'browserify:app', 'browserify:vendor']);

gulp.task('clean:browserify:vendor', () => clean(glbs.js.build + VENDORBUILDFILENAME));

gulp.task('browserify:vendor', ['clean:browserify:vendor'],  () => {
    if (vendorkeys === []) {
        GenVendorKeys();        
    }

    let browse = browserify({
        debug: true
    });

    vendorkeys.forEach((x) => {
        //gutil.log('browserify:vendor adding: ' + (nid.indexOf('/') > -1 ? nid.substr(nid.lastIndexOf('/') + 1) : nid));
        browse.require(x.nid, { expose: x.id });
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

gulp.task('browserify:app', ['jshint'], function () {
    if (vendorkeys === []) {
        GenVendorKeys();        
    }

    let browse = browserify('src/index.js',{
        debug: true
    });

    vendorkeys.forEach((x) => {
        //gutil.log('browserify:app removing: ' + (nid.indexOf('/') > -1 ? nid.substr(nid.lastIndexOf('/') + 1) : nid));
        browse.external(x.id, { expose: x.nid });
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