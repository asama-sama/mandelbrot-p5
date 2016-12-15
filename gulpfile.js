var gulp = require('gulp');
var webpack = require('webpack');
var webpackstr = require('webpack-stream');
var clean = require('gulp-clean');

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['clean', 'build']);
});

gulp.task('fullbuild', ['clean', 'build']);

gulp.task('clean', function() {
  return gulp.src('build/*', {read: false})
    .pipe(clean());
});

gulp.task('build', function() {
  return gulp.src('')
  .pipe(webpackstr(require('./webpack.config.js')))
  .pipe(gulp.dest('build/'));
});

gulp.task('default', ['clean', 'build', 'watch']);