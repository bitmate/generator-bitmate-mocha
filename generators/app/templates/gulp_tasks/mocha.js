process.env.NODE_ENV = 'test';

const path = require('path');

const gulp = require('gulp');
const mocha = require('gulp-mocha');

const conf = require('../conf/gulp.conf');

gulp.task('mocha:single-run', mochaSingleRun);
gulp.task('mocha:auto-run', mochaAutoRun);

function mochaSingleRun() {
  const configFile = path.join(process.cwd(), 'conf', 'mocha.conf.js');
  return gulp.src([path.join(conf.paths.server, '/**/*.{spec,mock}.js')], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      timeout: 5000,
      require: [configFile]
    }));
}

function mochaAutoRun() {
  const configFile = path.join(process.cwd(), 'conf', 'mocha.conf.js');
  return gulp.src([path.join(conf.paths.server, '/**/*.{spec,mock}.js')], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      timeout: 5000,
      watch: true,
      require: [configFile]
    }));
}
