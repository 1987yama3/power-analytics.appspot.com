import browserify from 'browserify';
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import exec from 'child_process';

const config = {
  dir: {
    dist: './appengine/views'
  }
};

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

