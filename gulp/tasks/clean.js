
// TODO: When registering task, check other modules for namespaced `clean:<module>` tasks and aggregate. 

var
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    glbs = require('../config.js').dir;

var Clean = function(path) {
    return gulp
        .src(path)
        .pipe(rimraf())
}

// Hard Clean
gulp.task('clean', () => Clean(glbs.root.build));

module.exports = Clean;