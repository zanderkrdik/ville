var gulp = require('gulp');
var sass = require('gulp-sass');
var browsersync = require("browser-sync").create();
var rimraf = require('gulp-rimraf');
var sprite = require('gulp-sprite-generator');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    dest: 'build/',
    js: 'src/*.js',
    scss: 'src/scss/*.scss',
    images: 'src/img/**/*',
    html: 'src/*.html'
};

gulp.task('clean', () =>
    gulp
        .src(paths.dest, { read: false }) // much faster 
        .pipe(rimraf())
    );

gulp.task('html', ['clean'], () =>
    gulp
        .src(paths.html)
        .pipe(gulp.dest(paths.dest))
        .pipe(browsersync.stream())
    );

gulp.task('sass', ['clean'], () =>
    gulp
        .src(paths.scss)
        .pipe(sass({ includePaths: ['scss'] }))
        .pipe(gulp.dest(paths.dest + 'css'))
        .pipe(browsersync.stream())
    );

gulp.task('images', ['clean'], () => 
    
    //   var spriteOutput;
 
    // spriteOutput = gulp.src(paths.dest + 'css/*.css')
    // 	.pipe(sprite({
    //         baseUrl:         "./src/img",
    //         spriteSheetName: "sprite.png"
    // 	}));
 
    // spriteOutput.css.pipe(gulp.dest(paths.dest + 'css'));
    // spriteOutput.img.pipe(gulp.dest("./build"));
    
    
    gulp
        .src(paths.images)
        .pipe(gulp.dest(paths.dest + 'img'))
    );

gulp.task('js', ['clean'], () =>
    gulp
        .src(paths.js)
        .pipe(gulp.dest(paths.dest))
        .pipe(browsersync.stream())
    );

// Wrapup Function
gulp.task('build', ['clean', 'html', 'sass', 'images', 'js']);


gulp.task('browser-sync', ['build'], () => {
    browsersync.init({
        server: {
            baseDir: paths.dest
        }
    })
});

gulp.task('watch', ['build'], () => {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.html, ['html'])
});


gulp.task('default', ['build', 'browser-sync', 'watch']);


