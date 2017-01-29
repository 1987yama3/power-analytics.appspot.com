const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const exec = require('child_process').exec;

gulp.task('js:browserify', function() {
  return browserify('./src/index.js', { debug: true })
    .bundle()
    .pipe(source('./plugins.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('js:eslint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format());
});

gulp.task('js:uglify', function() {
  return gulp.src('./dist/plugins.js')
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('js:rename', function() {
  return gulp.src('./dist/*.js')
    .pipe(rename({
      extname: '.tpl'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js:clean', function() {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('deploy', function(done) {
  var command = 'appcfg.py -A power-analytics update .';
  exec(command, function(err, stdout, stderr) {
    if (stdout) console.log(strout);
    if (stderr) console.error(stderr);
    done();
  });
});

gulp.task('build', function(done) {
  runSequence('js:clean', 'js:eslint', 'js:browserify', 'js:uglify', 'js:rename', done);
});

