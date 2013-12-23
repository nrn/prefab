var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , cat = require('gulp-concat')

gulp.task('browserify', function () {
  gulp.src(['./client/index.js'])
    .pipe(browserify())
    .pipe(cat('client.js'))
    .pipe(gulp.dest('./public/'))
})

gulp.task('css', function () {
  gulp.src(['./public/dep/*.css', './client/*.css'])
    .pipe(cat('style.css'))
    .pipe(gulp.dest('./public/'))
})

gulp.task('default', function () {
  gulp.run('browserify')
  gulp.run('css')
})

gulp.task('watch', function () {
  gulp.run('default')
  gulp.watch('client/**/*.js', function () {
    gulp.run('browserify')
  })
  gulp.watch('client/**/*.css', function () {
    gulp.run('css')
  })
})
