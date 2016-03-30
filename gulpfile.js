const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  coffee = require('gulp-coffee'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel');

// Scripts Task
gulp.task('scripts', function(){
  gulp.src('js/*.js')
  .pipe(plumber())
  .pipe(babel({
  	presets: ['es2015']
  }))
  .pipe(gulp.dest('dist/'));
});

// Concatenate JS scripts
gulp.task('concat', function(){
  gulp.src('dist/script.js')
  .pipe(plumber())
  .pipe(concat('all.js'))
  .pipe(gulp.dest(''));
});

// Styles Task
gulp.task('styles', function() {
  return sass('scss/style.scss', { style: 'expanded' })
    .pipe(autoprefixer({
      browsers: ['> 1%']
    }))
    .pipe(gulp.dest('css'));
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('dist/*.js', ['concat']);
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'watch']);