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
var data = require('gulp-data');
var dataJson = require("gulp-data-json");
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
	return gulp.src('src/scss/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(gulpStylelint())
	.pipe($.sass())
	.pipe($.postcss(postcssPlugins))
	.pipe(cssnano())
	.pipe(rename('main.min.css'))
	.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'))
    .on('error', handleError)
	.pipe(browserSync.reload({
		stream: true
    }))
});

gulp.task('lint-scss', function lintCssTask() {
	return gulp
    .src('src/**/*.scss')

	.pipe(gulpStylelint({
	reporters: [
		{formatter: 'string', console: true}
	]
    }))
});

gulp.task('templates', function () {
	return gulp.src('src/*.html')
	.pipe(nunjucksRender({
		path: ['src/']
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

// function getDataForFile(file) {
//     return {
//         example: 'data loaded for ' + file.relative
//     };
// }

// sync
// var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('file', 'utf8'));

// async
// var fs = require('fs');
// var obj;
// fs.readFile('file', 'utf8', function (err, data) {
//   if (err) throw err;
//   obj = JSON.parse(data);
// });

gulp.task('pattern', function () {
    return gulp.src('src/components/**/*.njk')
    // .pipe(data( function(file) {
    //     return JSON.parse(
    //         fs.readFileSync('src/components/**/*.json')
    //     );
    // } ))
    .pipe(nunjucksRender({
        path: ['src/components/'],
        watch: false,
    }))
    .pipe(gulp.dest('src/components/'));
});


gulp.task('watch', ['browserSync', 'sass', 'templates'], function(){
	watch = true;
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/**/*.html', ['templates'], browserSync.reload);
  	gulp.watch('src/js/**/*.js', browserSync.reload);
});




gulp.task('scripts', function () {
	return gulp.src('src/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
});

gulp.task('images', function(){
	return gulp.src('src/assets/**/*.+(png|jpg|jpeg|gif|svg)')
	.pipe(cache(imagemin({
		interlaced: true
	  })))
	.pipe(gulp.dest('dist/assets'))
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
		baseDir: 'dist'
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
