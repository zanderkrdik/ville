const
    gulp = require('gulp'),
    glbs = require('../config.js').dir;


gulp.task('watch', ['build'], () => {
    gulp.watch(glbs.js.src, ['browserify:app']);
    gulp.watch(glbs.scss.src, ['sass']);
    gulp.watch(glbs.images.src, ['images']);
    gulp.watch(glbs.html.src, ['html']);
});
