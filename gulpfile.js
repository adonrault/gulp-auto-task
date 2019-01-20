// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')();

// Variables de chemins
var source = './src'; //dossier de travail
var destination = './dist'; //dossier à livrer

// Variables BrowserSync
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Initialisation serveur BrowserSync
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    browserSync.watch('./**/*.*').on('change', browserSync.reload);
});

// Tâche build = SASS + Compass + Autoprefixer + CSScomb + Beautify
gulp.task('css', function () {
    return gulp.src(source + '/*.scss')
         .pipe(plugins.sass())
         .pipe(plugins.compass({
             config_file: './config.rb',
             css: 'dist/css',
             sass: 'src/sass'
         }))
         .pipe(plugins.csscomb())
         .pipe(plugins.cssbeautify({indent: '  '}))
         .pipe(plugins.autoprefixer())
         .pipe(gulp.dest(destination + '/css'))
         .pipe(browserSync.reload({
             stream:true
         }));
 });

 //  Tâche reload HTML
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minification CSS
gulp.task('mincss', function () {
    return gulp.src(destination + '/css/*.css')
        .pipe(plugins.csso())
        .pipe(plugins.rename({
            suffix: 'min'
        }))
        .pipe(gulp.dest(destination + '/css'));
});

// Minification JS
gulp.task('minjs', function () {
    return gulp.src(source + '/js/*.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/js'));
});

// Minification Images
gulp.task('minimg', function () {
    return gulp.src(source + '/assets/images/*.*')
        .pipe(plugins.imagemin())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/images'));
});

// Tâche watch
gulp.task('watch', function () {
    gulp.watch('*.html', gulp.series('html'));
    gulp.watch('src/sass/*.scss', gulp.series('css'));
});

// Tâche par défault
gulp.task('default', gulp.series(
    gulp.parallel('watch', 'serve')
));

// Tâche production
gulp.task('prod', gulp.series(
    gulp.parallel('mincss', 'minjs', 'minimg')
));