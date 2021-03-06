'use strict';

const browserSync = require('browser-sync'),
  babel = require('gulp-babel'),
  cache = require('gulp-cache'),
  concat = require('gulp-concat'),
  env = require('minimist')(process.argv.slice(2)),
  ghPages = require('gulp-gh-pages'),
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  gutil = require('gulp-util'),
  imagemin = require('gulp-imagemin'),
  svgmin = require('gulp-svgmin'),
  svgSprite = require('gulp-svg-sprite'),
  minifyHtml = require('gulp-minify-html'),
  nunjucks = require('gulp-nunjucks-html'),
  plumber = require('gulp-plumber'),
  stylus = require('gulp-stylus'),
  surge = require('gulp-surge'),
  uglify = require('gulp-uglify');

// Nunjucks
gulp.task('nunjucks', () => {
  return gulp.src('src/templates/*.html')
    .pipe(plumber())
    .pipe(nunjucks({
      searchPaths: ['src/templates/']
    }))
    .pipe(gulpif(env.p, minifyHtml()))
    .pipe(gulp.dest('build/'));
});

// Stylus
gulp.task('stylus', () => {
  gulp.src('src/assets/styles/main.styl')
    .pipe(plumber())
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('build/assets/css'));
});

// Uglify and Concat JS
gulp.task('js', () => {
  return gulp.src('src/assets/js/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js/'))
});

// Imagemin
gulp.task('images', () => {
  gulp.src('src/assets/images/**/*')
    .pipe(plumber())
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 2
    }))
    .pipe(gulp.dest('build/assets/images'));
});

// svgmin
gulp.task('svgmin', () => {
  gulp.src('src/assets/svgs/**/*.svg')
    .pipe(plumber())
    .pipe(svgmin())
    .pipe(gulp.dest('build/assets/svgs/'))
});

const configsvg = {
  mode: {
    symbol: {
      dest: 'sprite',
      sprite: 'sprite.svg',
      example: true
    }
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
};

gulp.task('sprites', function () {
  return gulp.src('build/assets/svgs/**/*.svg')
    .pipe(plumber())
    .pipe(svgSprite(configsvg))
    .pipe(gulp.dest('build/assets/svgs/'))
});

// Watch
gulp.task('watch', () => {
  gulp.watch('src/templates/**/*.html', ['nunjucks']);
  gulp.watch('src/assets/styles/**/*.styl', ['stylus']);
  gulp.watch('src/assets/js/**/*.js', ['js']);
  gulp.watch('src/assets/images/**/*.{jpg,png,gif}', ['imagemin']);
  gulp.watch('src/assets/svgs/**/*', ['svgmin']);
});

// Browsesync
gulp.task('browser-sync', () => {
  let files = [
    'build/**/*.html',
    'build/assets/css/**/*.css',
    'build/assets/images/**/*',
    'build/assets/js/**/*.js'
  ];

  browserSync({
    files: ['./build/**/*.*'],
    port: 8080,
    server: {
      baseDir: './build/'
    }
  });
});

// ghpages
gulp.task('pages', () => {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// surge
gulp.task('surge', () => {
  return surge({
    project: './build',
    domain: 'example.surge.sh'
  })
})

// default
gulp.task('default', ['nunjucks', 'js', 'stylus', 'images', 'watch', 'browser-sync']);
// deploy-gh
gulp.task('deploy-gh', ['nunjucks', 'js', 'stylus', 'images', 'pages']);
// deploy-surge
gulp.task('deploy-surge', ['nunjucks', 'js', 'stylus', 'images', 'surge']);
