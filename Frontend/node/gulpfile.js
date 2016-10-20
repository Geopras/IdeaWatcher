'use strict';
var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

gulp.task('jsTransform', function(){
    console.log('js wird neu generiert');
    // Auswahl der Ausgangsdateien
    return gulp.src([
        '../dev/core/namespace.js',
        '../dev/controller/**/*',
        '../dev/view/javascript/**/*'
    ])
    //Verkettung der Dateien
    .pipe(concat('ideaWatcher.js'))
    //schreiben der Dateien auf Festplatte
    .pipe(gulp.dest('../dist/private'))
    // Datei in Strom umbenennen
    .pipe(rename('ideaWatcher.min.js'))
    // minifizieren
    .pipe(uglify())
    // auf Festplatte schreiben
    .pipe(gulp.dest('../dist/public'));
});

//region less -> css
gulp.task('less', function () {
    console.log('less -> css');
    return gulp.src(['../dev/view/less/concat/ideaWatcher.less'])
    .pipe(less())
    .pipe(gulp.dest('../dist/private'));
});
//endregion

//region compress css
// in Eckigen Klammern können Tasks angegebne werden, die vor beginn des
// aktuellen Tasks ausgeführt werden sollen
gulp.task('minicss', ['less'], function () {
    console.log('minifiziere css ...');
    return gulp.src('../dist/private/ideaWatcher.css')
    .pipe(cssnano())
    .pipe(rename('ideaWatcher.min.css'))
    .pipe(gulp.dest('../dist/public'));
});
//endregion