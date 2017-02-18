import browserify from 'browserify';
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import copy from 'gulp-copy';
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


gulp.task('js:browserify', () => {
  return browserify('./src/index.js', { debug: true })
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(source('./plugins.js'))
    .pipe(gulp.dest(config.dir.dist + '/'));
});

/**
 * eslintを実行して, コードのチェックを行う.
 */
gulp.task('js:eslint', () => {
  return gulp.src([
      './src/**/*.js',
      './test/e2e/**/*.js',
      './test/unit/**/*.js',
      '!./test/**/*.test.js',
    ])
    .pipe(eslint({ useEslintrc: true }))
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

/**
 * ライブラリファイルの単体テストを実行する.
 * テストの実施が難しいコードはテストしない.
 */
gulp.task('js:test:unit', () => {
  return gulp.src('./test/unit/**/*.test.js', { read: false })
    .pipe(mocha({}));
});

/**
 * 自動E2Eテスト用のローカルサーバーを開始する.
 */
gulp.task('js:test:server:start', (done) => {
  server.start({
    port: 8888,
    static_path: './test/www/'
  }, done);
  process.on('exit', server.stop.bind(server));
});

/**
 * 自動E2Eテスト用のローカルサーバーを停止する.
 */
gulp.task('js:test:server:stop', (done) => {
  server.stop();
  done();
});

/**
 * protractorを利用してE2Eテストを実行する.
 * 事前にjs:test:server:startを実行, 事後にjs:test:server:stopの
 * 実行が必要.
 */
gulp.task('js:test:protractor', () => {
  return gulp.src(['./test/e2e/**/*.test.js'])
    .pipe(babel())
    .pipe(protractor({
      configFile: './test/e2e/protractor.conf.js'
    }))
    .on('error', (e) => { throw e; });
});

/**
 * ビルドされたplugins.min.jsファイルをE2Eテスト用のディレクトリ
 * に移動する.
 */
gulp.task('js:test:copy', () => {
  return gulp.src(`${config.dir.dist}/plugins.min.js`)
    .pipe(gulp.dest('./test/www/'));
});

/**
 * E2Eの自動テストを実行する.
 */
gulp.task('js:test:e2e', (done) => {
  runSequence('build', 'js:test:copy', 'js:test:server:start', 'js:test:protractor', 'js:test:server:stop', done);
});


/**
 * App Engineにデプロイする.
 */
gulp.task('deploy', (done) => {
  var command = 'appcfg.py -A power-analytics update ./appengine';
  exec(command, (err, stdout, stderr) => {
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    done();
  });
});

/**
 * ソースコードのビルドを実行する.
 */
gulp.task('build', (done) => {
  runSequence('js:clean', 'js:eslint', 'js:browserify', 'js:uglify', 'js:rename', done);
});

