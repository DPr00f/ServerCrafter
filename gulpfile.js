var gulp        = require('gulp');
var babel       = require('gulp-babel');
var browserify  = require('gulp-browserify');
var react       = require('gulp-react');
var ext_replace = require('gulp-ext-replace');
var flatten     = require('gulp-flatten');
var sass        = require('gulp-sass');
var gulpsync    = require('gulp-sync')(gulp);
var del         = require('del');
var jest        = require('jest-cli');
var open        = require('gulp-open');
var gls         = require('gulp-live-server');

var jestTests   = '!src/**/__tests__/**/*.js';

var jestConfig = {
  verbose: true,
  coverage: true,
  config: {
    rootDir: 'src',
    scriptPreprocessor: __dirname + '/node_modules/babel-jest',
    testFileExtensions: [
      "es6",
      "js"
    ],
    moduleFileExtensions: [
      "js",
      "json",
      "es6"
    ]
  }
};

function jestWatch(changed) {
  var config = jestConfig;
  config.coverage = false; // Coverage doesn't update with a single file
  config.config.rootDir = changed.path;
  jest.runCLI(config, '.');
}

require('harmonize')(); // We need this for jest to run properly

var paths = {
  serverSrc: ['src/*.js',jestTests],
  appSrc: ['src/app/**/*.js',jestTests],
  helpersSrc: ['src/helpers/**/*.js',jestTests],
  jsxSrc: ['src/app/components/**/*.jsx',jestTests],
  clientSrc: ['src/public/js/main.js'],
  publicCopySrc: ['src/public/*.ico'],
  publicCopyFonts: ['src/public/css/fonts/*.eot','src/public/css/fonts/*.svg','src/public/css/fonts/*.ttf','src/public/css/fonts/*.woff'],
  sassSrc: ['src/public/css/main.scss'],
  distribution: 'dist'
};

function handleError(error) {
  console.error("" + error);
  this.emit('end');
}

gulp.task('transpileServer', function() {
  return gulp.src(paths.serverSrc)
             .pipe(babel())
             .on('error', handleError)
             .pipe(gulp.dest(paths.distribution));
});

gulp.task('transpileApp', function() {
  return gulp.src(paths.appSrc)
             .pipe(babel())
             .on('error', handleError)
             .pipe(gulp.dest(paths.distribution + '/app'));
});

gulp.task('transpileHelpers', function() {
  return gulp.src(paths.helpersSrc)
             .pipe(babel())
             .on('error', handleError)
             .pipe(gulp.dest(paths.distribution + '/helpers'));
});

gulp.task('transpileJSX', function() {
  return gulp.src(paths.jsxSrc)
             .pipe(babel())
             .on('error', handleError)
             .pipe(react())
             .on('error', handleError)
             .pipe(ext_replace('.jsx'))
             .pipe(gulp.dest(paths.distribution + '/app/components'));
});

gulp.task('compileClient', function() {
  return gulp.src(paths.clientSrc)
             .pipe(browserify({
               transform: ['babelify', 'require-globify']
             }))
             .on('error', handleError)
             .pipe(gulp.dest(paths.distribution + '/public/js/'));
});

gulp.task('sass', function() {
  return gulp.src(paths.sassSrc)
             .pipe(sass())
             .on('error', sass.logError)
             .pipe(gulp.dest(paths.distribution + '/public/css/'));
});

gulp.task('copy', function() {
  return gulp.src(paths.publicCopySrc)
             .pipe(flatten())
             .pipe(gulp.dest(paths.distribution + '/public'));
});

gulp.task('copyFonts', function() {
  return gulp.src(paths.publicCopyFonts)
             .pipe(flatten())
             .pipe(gulp.dest(paths.distribution + '/public/css/fonts'));
});

gulp.task('clean', function(cb) {
  del([paths.distribution], cb);
});

gulp.task('server', function() {
  var server = gls('dist/server.js');
  server.start();
  gulp.watch(['src/public/css/**/*.scss'], ['sass']);
  gulp.watch(['src/public/js/**/*.js', 'src/**/*.client.js', 'src/**/*.jsx', jestTests], ['compileClient']);
  gulp.watch(['src/**/*.jsx', jestTests], ['transpileViews', server.start.bind(server)]);
  gulp.watch(['src/**/*.js','src/**/*.jsx', '!src/**/*.client.js', '!src/public/js/**/*.js', jestTests], ['transpileViews', 'transpile', 'compileClient', server.start.bind(server)]);

  gulp.start('test-watch');
});

gulp.task('test', function() {
  jest.runCLI(jestConfig, '.', function(passed){
    if(!passed) {
      console.error('FAIL: Errors on tests');
      process.exit(1);
    }
  });
});

gulp.task('test-watch', function() {
  gulp.watch([jestTests.replace('!', '')], jestWatch);
});

gulp.task('transpile', ['transpileServer', 'transpileApp', 'transpileHelpers']);
gulp.task('transpileViews', ['transpileJSX']);
gulp.task('build', gulpsync.sync(['test', 'transpile', 'transpileViews', 'sass', 'copy', 'copyFonts', 'compileClient']));
gulp.task('clean-build', gulpsync.sync(['clean', 'build']));
gulp.task('default', gulpsync.sync(['clean-build', 'server']));
