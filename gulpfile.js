var gulp = require('gulp');
var sass = require('gulp-sass');
var browsersync = require("browser-sync").create();

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    js: ['src/*.js'],
    scss: 'src/scss/*.scss',
    images: 'src/img/**/*',
    html: 'src/*.html',
    dest: 'build/'
};

gulp.task('clean', () => {
    del([paths.dest]);
});

gulp.task('html', [], () => {
    gulp.src(paths.html)
        .pipe(gulp.dest(paths.dest))
        .pipe(browsersync.stream());
});

gulp.task('sass', () => {
    gulp.src(paths.scss)
        .pipe(sass({ includePaths: ['scss'] }))
        .pipe(gulp.dest(paths.dest + 'css'))
        .pipe(browsersync.stream());
});

gulp.task('images', [], () => {
    gulp.src(paths.images)
        .pipe(gulp.dest(paths.dest + 'img'));
});

gulp.task('js', [], () => {
    gulp.src(paths.js)
        .pipe(gulp.dest(paths.dest))
        .pipe(browsersync.stream());
});

gulp.task('browser-sync', () => {
    browsersync.init({
        server: {
            baseDir: paths.dest
        }
    });
});



gulp.task('watch', () => {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.html, ['html']);
});


gulp.task('build', ['clean', 'html', 'sass', 'images', 'js']);
gulp.task('default', ['build', 'browser-sync', 'watch']);


