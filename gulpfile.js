var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    extender = require('gulp-html-extend'),
    package = require('./package.json');


var banner = [
    '/*!\n' +
    ' * <%= package.name %>\n' +
    ' * <%= package.title %>\n' +
    ' * <%= package.url %>\n' +
    ' * @author <%= package.author %>\n' +
    ' * @version <%= package.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
    ' */',
    '\n'
].join('');

gulp.task('css', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer('last 4 version'))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner, { package: package }))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
    gulp.src('src/js/scripts.js')
        .pipe(jshint.reporter('default'))
        .pipe(header(banner, { package: package }))
        .pipe(gulp.dest('app/assets/js'))
        .pipe(uglify())
        .pipe(header(banner, { package: package }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/assets/js'))
        .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('extend', function() {
    // gulp.src('src/html/*.html')
    gulp.src(['src/html/*.html',
            'src/html/*/*.html',
            '!src/html/partials{,/**/*}'
        ])
        .pipe(extender({ annotations: true, verbose: false })) // default options
        .pipe(gulp.dest('app'))

})

gulp.task('copy_img', function() {
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('app/assets/img'))
});

gulp.task('copy_css', function() {
    gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('app/assets/css'))
});

gulp.task('copy_js', function() {
    gulp.src('src/js/**/*')
        .pipe(gulp.dest('app/assets/js'))
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'extend', 'copy_img', 'copy_css', 'copy_js', 'browser-sync'], function() {
    gulp.watch("src/scss/*/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("src/img/*", ['copy_img']);
    // gulp.watch(['src/html/*.html'], ['extend']);
    gulp.watch(['src/html/*/*.html'], ['extend']);
    gulp.watch("app/*.html", ['bs-reload']);
});