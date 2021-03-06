const
    gulp = require('gulp'),
    clean = require('./clean.js'),
    glbs = require('../config.js').dir;

// Special Case: Only HTML files are stored at the root.
// Neccessitates string concat in path.
gulp.task('clean:html', () => clean(glbs.html.build + '*.html'));

gulp.task('html', ['clean:html'], () =>
    gulp
        .src(glbs.html.src)
        .pipe(gulp.dest(glbs.html.build))
    );