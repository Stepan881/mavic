"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var del = require("del");

gulp.task("del", function () {
    return del("build");
  });

  gulp.task("copy", function () {
    return gulp.src([
      "app/fonts/**",
      "app/img/**",
      "app/*.html",
      "app/*.js",
    ], {
      base: "app"
    })

    .pipe(gulp.dest("build"));
  });

  gulp.task("css", function () {
    return gulp.src("app/sass/style.scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(gulp.dest("app/css"))
      .pipe(csso())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("build/css"))
      .pipe(server.stream());
  });

  gulp.task("html", function () {
    return gulp.src("app/*.html")
      .pipe(gulp.dest("build"));
      
  });

  gulp.task("js", function () {
    return gulp.src("app/js/**/*")
      .pipe(gulp.dest("build/js"));
      
  });

  gulp.task("img", function () {
    return gulp.src("app/img/**/*")
      .pipe(gulp.dest("build/img"));
  });

  gulp.task("server", function () {
    server.init({
      server: "build/",
      notify: false,
      open: true,
      cors: true,
      ui: false,
      tunnel: false
    });
    gulp.watch("app/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
    gulp.watch("app/img/**/*", gulp.series("img", "refresh"));
    gulp.watch("app/*.html", gulp.series("html", "refresh"));
    gulp.watch("app/js/**/*.js", gulp.series("js", "refresh"));
  });

  gulp.task("refresh", function(done) {
    server.reload();
    done();
  });

gulp.task("build", gulp.series("del", "copy", "css", "js"));
gulp.task("start", gulp.series("build", "server"));