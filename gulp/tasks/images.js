var
    gulp = require('gulp'),
    clean = require('./clean.js'),
    glbs = require('../config.json').dir;
// //var sprite = require('gulp-sprite-generator');


gulp.task('clean:images', () => clean(glbs.images.build));

gulp.task('images', ['clean:images'], () => 
    // {
    //   var spriteOutput;
 
    // spriteOutput = gulp.src(paths.dest + 'css/*.css')
    // 	.pipe(sprite({
    //         baseUrl:         "./src/img",
    //         spriteSheetName: "sprite.png"
    // 	}));
 
    // spriteOutput.css.pipe(gulp.dest(paths.dest + 'css'));
    // spriteOutput.img.pipe(gulp.dest("./build"));
    //}
    gulp
        .src(glbs.images.src)
        .pipe(gulp.dest(glbs.images.build))
    );
