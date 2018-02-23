const gulp = require('gulp');
const ts = require('gulp-typescript');
const stylus = require('gulp-stylus');
const webserver = require('gulp-webserver');
const merge = require('merge-stream');
const tasks = require('./tasks');

let env = process.env;

let buildTsTask = tasks.buildTs;
let buildStylTask = tasks.buildStyl;
let buildJadeTask = tasks.buildJade;
let cleanTask = tasks.clean;
let serverTask = tasks.server;

const buildTsSrc = 'src/**/*.ts';
const buildStylSrc = 'src/**/*.styl';
const buildJadeSrc = 'src/**/*.jade';

const dist = 'dist';
const port = env.PORT || 8000;

process.on('uncaughtException', function(err) {
  console.error(err.message, err.stack, err.errors);
  process.exit(255);
});

gulp.task('clean', cleanTask.bind(null, dist));

gulp.task('ts', ['clean'], buildTsTask.bind(null, {src : buildTsSrc, dist : dist}));
gulp.task('stylus', ['clean'], buildStylTask.bind(null, {src : buildStylSrc, dist : dist}));
gulp.task('jade', ['clean'], buildJadeTask.bind(null, {src : buildJadeSrc, dist : dist}));

gulp.task('server', serverTask.bind(null, dist, port));

gulp.task('buildAndStart', ['ts', 'stylus', 'jade', 'vendor'], serverTask.bind(null, dist, port));

gulp.task('build', ['ts', 'stylus', 'jade', 'vendor'], () => {});


gulp.task('vendor', ['clean'], function () {

  let files = [
    ['node_modules/angular/angular.min.js', 'vendor/angular'],
    ['node_modules/angular/angular.min.js.map', 'vendor/angular']
  ];
  let options = {cwd : dist, overwrite : true};

  return merge(files.map(function (f) {
    return gulp.src(f[0])
      .pipe(gulp.dest(f[1], options))
  }));
});