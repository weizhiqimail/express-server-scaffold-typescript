const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const autoPreFixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const ncp = require('ncp').ncp;
const initEnv = require('./scripts/initEnv');
const { checkTargetPath } = require('./scripts/helper');

initEnv();

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';

sass.compiler = require('node-sass');

const PATH = {
  image: {
    src: './raw_assets/image/**/*',
    dist: './dist/assets/assets/image',
  },
  styleSass: {
    src: './raw_assets/scss/**/*.scss',
    dist: './dist/assets/assets/style',
  },
  styleCss: {
    src: './raw_assets/css/**/*.css',
    dist: './dist/assets/assets/style',
  },
  javascript: {
    src: './raw_assets/javascript/*.js',
    dist: './dist/assets/assets/javascript',
  },
  font: {
    src: './raw_assets/font/**/*',
    dist: './dist/assets/assets/font',
  },
  lib: {
    src: './raw_assets/lib/**/*',
    dist: './dist/assets/assets/lib',
  },
};

function image() {
  return gulp.src(PATH.image.src)
    .pipe(gulp.dest(PATH.image.dist));
}

function font() {
  return gulp.src(PATH.font.src).pipe(gulp.dest(PATH.font.dist));
}

function styleSass() {
  return gulp.src(PATH.styleSass.src, { allowEmpty: true })
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoPreFixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.styleSass.dist));
}

function styleCss() {
  return gulp.src(PATH.styleCss.src, { allowEmpty: true })
    .pipe(autoPreFixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.styleSass.dist));
}

function javascript() {
  return gulp.src(PATH.javascript.src)
    .pipe(gulpIf(IS_PROD, sourcemaps.init()))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulpIf(IS_PROD, uglify({ mangle: false, compress: true })))
    .pipe(gulpIf(IS_PROD, javascriptObfuscator({ compact: true })))
    .pipe(gulpIf(IS_PROD, sourcemaps.write('.')))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.javascript.dist));
}

function lib() {
  return gulp.src(PATH.lib.src)
    .pipe(gulp.dest(PATH.lib.dist));
}

function watch(done) {
  gulp.watch(PATH.image.src, image);
  gulp.watch(PATH.font.src, font);
  gulp.watch(PATH.styleCss.src, styleCss);
  gulp.watch(PATH.styleSass.src, styleSass);
  gulp.watch(PATH.javascript.src, javascript);
  gulp.watch(PATH.lib.src, lib);
  done();
}

function copy() {
  return new Promise((resolve, reject) => {
    mkdirSync('./dist/assets');
    mkdirSync('./dist/assets/assets');
    copyDir('./assets', './dist/assets/assets');
    copyDir('./scripts', './dist/scripts');
    copyDir('./views', './dist/views');
    copyFile('./.env', './dist/.env');
    copyFile('./package.json', './dist/package.json');
    copyFile('./ormconfig.js', './dist/ormconfig.js');
    copyFile('./ecosystem.config.js', './dist/ecosystem.config.js');
    setTimeout(() => {
      return resolve(true);
    });
  });
}

function copyDir(fromPath, targetPath) {
  fromPath = absolutePath(fromPath);
  targetPath = absolutePath(targetPath);
  checkTargetPath(fromPath);
  checkTargetPath(targetPath);
  ncp(fromPath, targetPath, err => {
    if (err) {
      console.log(err);
    }
  });
}

function copyFile(fromPath, targetPath) {
  fromPath = absolutePath(fromPath);
  targetPath = absolutePath(targetPath);
  const data = fs.readFileSync(fromPath, 'utf8');
  fs.writeFileSync(targetPath, data, 'utf8');
}

function mkdirSync(dir) {
  const p = path.resolve(__dirname, dir);
  const exist = fs.existsSync(p);
  if (!exist) {
    fs.mkdirSync(p);
  }
}

function absolutePath(p) {
  return path.resolve(__dirname, p);
}

checkTargetPath(path.resolve(__dirname, './dist'));

const build = gulp.series(gulp.parallel(image, font, styleSass, styleCss, lib, javascript, copy));

exports.default = gulp.series(build, watch);
