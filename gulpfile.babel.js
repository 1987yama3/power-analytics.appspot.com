import browserify from 'browserify';
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import runSequence from 'run-sequence';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import {spawn} from 'child_process';
import seleniumServerJar from 'selenium-server-standalone-jar';
import webdriver from 'gulp-webdriver';
import { protractor, webdriver_standalone } from 'gulp-protractor';
import mocha from 'gulp-mocha';
import webserver from 'gulp-webserver';

import * as server from './test/e2e/server';

const config = {
  dir: {
    dist: './appengine/views'
  }
};

let seleniumServer;

gulp.task('webserver', () => {
  return gulp.src('./test/www')
    .pipe(webserver({
      host: 'localhost',
      port: 8888
    }));
});

gulp.task('protractor', () => {
  return gulp.src(['./test/e2e/**/*.test.js'])
    .pipe(babel())
    .pipe(protractor({
      configFile: './test/e2e/protractor.conf.js',
      args: [ '--baseUrl', 'http://localhost:8888' ]
    }))
    .on('error', (e) => { throw e; });
});

gulp.task('test:e2e', (done) => {
  runSequence('webserver', 'protractor', done);
});

gulp.task('js:browserify', () => {
  return browserify('./src/index.js', { debug: true })
    .bundle()
    .pipe(source('./plugins.js'))
    .pipe(gulp.dest(config.dir.dist + '/'));
});

gulp.task('js:eslint', () => {
  return gulp.src('./src/**/*.js')
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format());
});

gulp.task('js:uglify', () => {
  return gulp.src(config.dir.dist + '/plugins.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dir.dist + '/'));
});

gulp.task('js:rename', () => {
  return gulp.src(config.dir.dist + '/*.js')
    .pipe(rename({
      extname: '.tpl'
    }))
    .pipe(gulp.dest(config.dir.dist));
});

gulp.task('js:clean', () => {
  return gulp.src(config.dir.dist, { read: false })
    .pipe(clean());
});

gulp.task('js:test:unit', () => {
  return gulp.src('./test/unit/**/*.test.js', { read: false })
    .pipe(mocha({}));
});

gulp.task('deploy', (done) => {
  var command = 'appcfg.py -A power-analytics update ./appengine';
  exec(command, (err, stdout, stderr) => {
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    done();
  });
});

gulp.task('build', (done) => {
  runSequence('js:clean', 'js:eslint', 'js:browserify', 'js:uglify', 'js:rename', done);
});

