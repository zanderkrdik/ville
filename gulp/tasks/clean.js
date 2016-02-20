
// TODO: When registering task, check other modules for namespaced `clean:<module>` tasks and aggregate. 

const
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    glbs = require('../config.js').dir;

const Clean = (path) =>
    gulp
        .src(path)
        .pipe(rimraf());


// Hard Clean
gulp.task('clean', () => Clean(glbs.root.build));

module.exports = Clean;