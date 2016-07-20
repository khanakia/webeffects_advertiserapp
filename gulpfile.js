// var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// elixir(function(mix) {
//     mix.sass('app.scss');
// });


var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');

// var files = ['./**/*.js', '!node_modules', '!bower_components'];

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css_sass/'))
});


gulp.task('webpack', function() {
    gulp.src('index.js')
		  .pipe(webpack( require('./webpack.config.js') ))
		  .pipe(gulp.dest('public/'));
});

//Watch task
gulp.task('default',function() {
    // gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch(files,['webpack']);
});