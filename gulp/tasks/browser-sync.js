var
    gulp = require('gulp'),
    browsersync = require('browser-sync'),
    glbs = require('../config.js').dir;


gulp.task('browser-sync', ['build'], () => {
    browsersync.init({
        server: {
            baseDir: glbs.root.build
        }
    })
});