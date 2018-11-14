const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const pump = require('pump');
const gulpStylelint = require('gulp-stylelint');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
var nunjucksRender = require('gulp-nunjucks-render');
var webpack = require('webpack-stream');

const postcssPlugins = [
	autoprefixer({
		browsers: [
			'last 2 versions',
			'> 1%'
		],
		grid: true,
		cascade: false
	})
];

function handleError (error) {
    console.log(error.toString())
    this.emit('end')
}

// generic gulp task
// gulp.task('pluginName', function() {
// 	return gulp.src('src-files')
// 	.pipe(pluginName())
// 	.pipe(gulp.dest('destination'))
// 	console.log('...');
// });

gulp.task('sass', ['lint-scss'], function() {
	return gulp.src('app/src/scss/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(gulpStylelint())
	.pipe($.sass())
	.pipe($.postcss(postcssPlugins))
	.pipe(cssnano())
	.pipe(rename('main.min.css'))
	.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/dist/css/'))
    .on('error', handleError)
	.pipe(browserSync.reload({
		stream: true
    }))
});

gulp.task('lint-scss', function lintCssTask() {
	return gulp
    .src('app/src/**/*.scss')

	.pipe(gulpStylelint({
	reporters: [
		{formatter: 'string', console: true}
	]
    }))
});

gulp.task('templates', function () {
	return gulp.src('app/src/*.html')
	.pipe(nunjucksRender({
		path: ['app/src/']
	}))
	.pipe(gulp.dest('app/dist'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('watch', ['browserSync', 'sass', 'templates'], function(){
	watch = true;
	gulp.watch('app/src/scss/**/*.scss', ['sass']);
	gulp.watch('app/src/**/*.html', ['templates'], browserSync.reload);
  	gulp.watch('app/src/js/**/*.js', browserSync.reload);
});




gulp.task('scripts', function () {
	return gulp.src('app/src/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('app/dist/'));
});

gulp.task('images', function(){
	return gulp.src('app/src/assets/**/*.+(png|jpg|jpeg|gif|svg)')
	.pipe(cache(imagemin({
		interlaced: true
	  })))
	.pipe(gulp.dest('app/dist/assets'))
});

gulp.task('fonts', function() {
	return gulp.src('app/src/fonts/**/*')
	.pipe(gulp.dest('app/dist/fonts'))
});

gulp.task('clean:dist', function() {
	return del.sync('app/dist');
});

gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
		baseDir: 'app/dist'
		},
	})
});

gulp.task('default', function (callback) {
	runSequence(
		'clean:dist',
		'sass',
		['scripts', 'templates', 'images', 'fonts'],
	  callback
	)
});
