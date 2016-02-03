'use strict';

const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const rename = require('gulp-rename');
const clone = require('gulp-clone');
const es = require('event-stream');

gulp.task('default', () => {
  const imgs = gulp.src('source/client/img/profile_img/**/*.{png,jpg,jpeg}');

  const x1_200 = imgs.pipe(clone())
    .pipe(imageResize({
      width: 200,
      upscale: false,
    }))
    .pipe(rename((path) => {
      path.basename += '-200-@1x';
    }));

  const x2_200 = imgs.pipe(clone())
    .pipe(imageResize({
      width: 400,
      upscale: false,
    }))
    .pipe(rename((path) => {
      path.basename += '-200-@2x';
    }));

  const x1_300 = imgs.pipe(clone())
    .pipe(imageResize({
      width: 300,
      upscale: false,
    }))
    .pipe(rename((path) => {
      path.basename += '-300-@1x';
    }));

  const x2_300 = imgs.pipe(clone())
    .pipe(imageResize({
      width: 600,
      upscale: false,
    }))
    .pipe(rename((path) => {
      path.basename += '-300-@2x';
    }));

  return es.merge(x1_200, x2_200, x1_300, x2_300)
    .pipe(gulp.dest('public/img'));
});
