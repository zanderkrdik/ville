var
    gulp = require('gulp'),
    browsersync = require('browser-sync'),
    glbs = require('../config.js').dir;


gulp.task('browser-sync', ['build', 'watch'], () => {
    browsersync.init({
        server: {
            baseDir: glbs.root.build
        }
    })
    
    gulp.watch(glbs.root.build + "**/*.{html,js,css}").on('change', browsersync.reload);
});