// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './sass'; // dossier de travail
var destination = './style'; // dossier à livrer

// Tâche "build" = SASS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('css', function () {
  return gulp.src(source)
    .pipe(plugins.scss())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(destination + '*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination));
});

// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche "watch" = je surveille *sass
gulp.task('watch', function () {
  gulp.watch(source + '*.scss', ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);