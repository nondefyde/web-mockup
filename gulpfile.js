const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});
// keeps gulp from crashing for scss errors
gulp.task('sass', () => {
    console.log('compiling.....');
    return gulp.src('./src/**/*.scss')
        .pipe(sass({ errLogToConsole: true }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series(['sass'], () => {
    
    browserSync.init({
        server: "./public"
    });
    
    gulp.watch('./src/**/*.scss', gulp.series(['sass']));
    gulp.watch('./public/**/*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series(['serve']));
