var gulp = require('gulp');

// gulp.task('default', ['html', 'sass', 'js'], function() {
//     gulp.start();
// });

gulp.task('default', ['build', 'browser-sync', 'watch']);