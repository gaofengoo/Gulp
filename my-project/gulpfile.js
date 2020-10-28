'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),
	smushit = require('gulp-smushit'),
	htmlmin = require('gulp-htmlmin');

// Sass convert CSS
gulp.task('convertScss', function () {
	return gulp.src('static/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
});

// Less convert CSS
gulp.task('convertLess', function () {
	return gulp.src('static/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('dist/css'));
});

// CSS prefix
gulp.task('prefixCss', function () {
	return gulp.src('static/css/*.css')
		.pipe(autoprefixer({
			overrideBrowserslist:['> 1%', 'last 2 versions', 'Firefox ESR'], 
            cascade: false 
		}))
		.pipe(gulp.dest('dist/css'));
});

// CSS concat
gulp.task('concatCss', function () {
	return gulp.src('static/css/*.css')
		.pipe(concat('newAll.css'))
		.pipe(gulp.dest('dist/css'));
});

// CSS compress
gulp.task('compressCss', function () {
    return gulp.src('static/css/*.css')
        .pipe(minifyCSS())
        .pipe(rename({     
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

// JS concat and compress
gulp.task('minifyJs',function(){
   return gulp.src('static/js/*.js')  
       .pipe(concat('newAll.js'))   
       .pipe(gulp.dest('dist/js'))        
       .pipe(rename({
	       	suffix:'.min'
       }))     
       .pipe(uglify())                    
       .pipe(gulp.dest('dist/js')); 
});

// ES6 to ES5
gulp.task('esTransform', function () {
    return gulp.src('static/js/es6.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'));
});

// Img compress
gulp.task('smushit', function () {
    return gulp.src('static/image/*')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('dist/image'));
});

// HTML compress
gulp.task('html', function () {
    var htmlOptions = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    return gulp.src('static/html/*.html')
        .pipe(htmlmin(htmlOptions))
        .pipe(gulp.dest('./dist/html'));
});