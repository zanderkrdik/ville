var
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    clean = require('./clean.js'),
    glbs = require('../config.js').dir;

// Special Case: Only HTML files are stored at the root.
// Neccessitates string concat in path.
gulp.task('clean:html', () => clean(glbs.html.build + '*.html'));

gulp.task('html', ['clean:html'], function() {
    return gulp
        .src(glbs.html.src)
        .pipe(gulp.dest(glbs.html.build));
});