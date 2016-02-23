var
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    browsersync = require('browser-sync'),
    glbs = require('../config.js').dir;


gulp.task('browser-sync', ['build', 'watch'], () => {
    browsersync.init({
        server: {
            baseDir: glbs.root.build
        }
    });
    
    gulp.watch(glbs.root.build + "**/*.{html,js,css}").on('change', function(evt) {
        gutil.log('Reloading: ' + evt);
        browsersync.reload();
    });
});