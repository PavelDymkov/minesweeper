var gulp = require("gulp");
var browserify = require("gulp-browserify");
var rename = require("gulp-rename");
var stylus = require("gulp-stylus");
var plumber = require("gulp-plumber");
var Server = require("light-server");


gulp.task("scripts-compiler", function() {
    gulp.src("sources/scripts/application.es6", { read: false })
    	.pipe(plumber())
		.pipe(browserify({
			transform: ["babelify"],
			debug: true
		}))
		.pipe(rename("minesweeper.js"))
		.pipe(gulp.dest("public/js/"));
});

gulp.task("styles-compiler", function() {
	gulp.src("sources/styles/main.styl")
		.pipe(stylus())
		.pipe(rename("minesweeper.css"))
		.pipe(gulp.dest("public/css/"));
});

gulp.task("dev-server", function() {
    var server = new Server("public/", ["public/*.*", "public/**/*.*"], null, {
		port: 9090
	});
	
	server.start();
});

gulp.task("default", ["scripts-compiler", "styles-compiler"], function() {
    var server = new Server("public/", [], null, {
		port: 9090
	});
	
	server.start();
});

gulp.task("dev", ["scripts-compiler", "styles-compiler", "dev-server"], function() {
	gulp.watch("sources/scripts/*.es6", ["scripts-compiler"]);
	gulp.watch("sources/styles/*.styl", ["styles-compiler"]);
});