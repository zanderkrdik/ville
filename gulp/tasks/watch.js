var
    gulp = require('gulp'),
    glbs = require('../config.js').dir;


gulp.task('watch', ['build', "browser-sync"], () => {
    gulp.watch(glbs.js.src, ['js']);
    gulp.watch(glbs.scss.src, ['sass']);
    gulp.watch(glbs.images.src, ['images']);
    gulp.watch(glbs.html.src, ['html'])
});
