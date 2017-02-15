import browserify from 'browserify';
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import {spawn} from 'child_process';
import seleniumServerJar from 'selenium-server-standalone-jar';
import webdriver from 'gulp-webdriver';

import * as server from './test/e2e/server';

const config = {
  dir: {
    dist: './appengine/views'
  }
};

let seleniumServer;

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

gulp.task('test', ['build', 'js:serve', 'js:selenium', 'js:test:e2e'], () => {
  console.log('test');
});

gulp.task('js:test:e2e', ['build', 'js:serve', 'js:selenium'], () => {
  const stopServers = () => {
    server.stop();
    if (!process.env.CI) {
      seleniumServer.kill();
    }
  };
  return gulp.src('./test/e2e/wdio.conf.js')
    .pipe(webdriver())
    .on('end', stopServers);
});

gulp.task('js:serve', (done) => {
  server.start(done);
  process.on('exit', server.stop.bind(server));
});

gulp.task('js:selenium', (done) => {
  if (process.env.CI) return done();
  seleniumServer = spawn('java', ['-jar', seleniumServerJar.path]);
  seleniumServer.stderr.on('data', (data) => {
    if (data.indexOf('Selenium Server is up and running') > -1) {
      done();
    }
  });
  process.on('exit', seleniumServer.kill.bind(seleniumServer));
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

