
var 
    src = "src/", 
    dest = "build/";


module.exports = {
    "dir": {
        "root": {
            "src": src,
            "build": dest
        },
        "html": {
            "src": src + "**/*.html",
            "build": dest
        },
        "js": {
            "src": src+ "**/*.js",
            "build": dest + "js/"
        },
        "scss": {
            "src": src + "scss/*.scss",
            "build": dest + "css/"
        },
        "images": {
            "src": src+ "img/*",
            "build": dest + "img/"
        }
    }
}