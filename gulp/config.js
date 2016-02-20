
var
    src = "src/",
    dest = "build/";


module.exports = {
    dir: {
        root: {
            src: src,
            build: dest
        },
        html: {
            src: src + "**/*.html",
            build: dest
        },
        js: {
            src: src + "**/*.js",
            build: dest + "js/"
        },
        scss: {
            src: src + "scss/*.scss",
            build: dest + "css/"
        },
        images: {
            src: src + "img/*",
            build: dest + "img/"
        }, 
        gulp: "gulp/**/*.js"
    },
    jshint: {
        esversion: 6,
        undef: true,
        unused: true,
        predef: [ "console", "module", "require" ], 
        curly: true, 
        eqeqeq: true
    }
};