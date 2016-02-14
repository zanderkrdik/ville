var
    gulp = require('gulp'),
    glbs = require('../config.json').dir;


gulp.task('watch', ['build'], () => {
    gulp.watch(glbs.js.src, ['js']);
    gulp.watch(glbs.scss.src, ['sass']);
    gulp.watch(glbs.images.src, ['images']);
    gulp.watch(glbs.html.src, ['html'])
});
