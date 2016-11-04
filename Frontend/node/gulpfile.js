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
        '../dev/core/messageBroker.js',
        '../dev/core/navigator.js',
        '../dev/core/websocketConnector.js',
        '../dev/core/localizer.js',
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
    .pipe(gulp.dest('../dist/private'))
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
    .pipe(gulp.dest('../dist/private'))
    .pipe(gulp.dest('../dist/public'));
});
//endregion

//region build html
gulp.task('buildhtml', function () {
    console.log('Erstelle HTML-Datei...');
    // Auswahl der Ausgangsdateien -> Reihenfolge wichtig!
    return gulp.src([
        '../dev/view/html/head.html',
        '../dev/view/html/mainMenu-view.html',
        '../dev/view/html/login-view.html',
        '../dev/view/html/ideaList-view.html',
        '../dev/view/html/ideaDetails-view.html',
        '../dev/view/html/ideaCreation-view.html',
        '../dev/view/html/profile-view.html',
        '../dev/view/html/profileEdit-view.html',
        '../dev/view/html/signUp-view.html',
        '../dev/view/html/impress-view.html',
        '../dev/view/html/foot.html'
    ])
    //Verkettung der Dateien
        .pipe(concat('ideaWatcher.html'))
        // auf Festplatte schreiben
        .pipe(gulp.dest('../dist/private'))
        .pipe(gulp.dest('../dist/public'));
});
//endregion

//region deploy resources
gulp.task('deployres', function () {
    console.log('Kopiere Ressourcen in Auslieferungspfad...');
    return gulp.src('../dev/view/res/**/*')
        .pipe(gulp.dest('../dist/private/resources'))
        .pipe(gulp.dest('../dist/public/resources'));
});
//endregion

gulp.task('buildAll', ['jsTransform', 'minicss', 'buildhtml', 'deployres'], function(){
    console.log('Javascript und CSS minimiert, HTML neu zusammengebaut und Ressourcen aktualisiert...');
});