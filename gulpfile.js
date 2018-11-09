var gulp          = require('gulp'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browsersync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require("gulp-notify"),
	rsync         = require('gulp-rsync'),
	wait	      = require('gulp-wait'),
	sourcemaps    = require('gulp-sourcemaps'),
	pug           = require('gulp-pug');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/scss/*.scss')
	.pipe(wait(1500))
	.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
		// .pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task("pug", () => {
	return gulp
	  .src('app/pug/*.pug')
	  .pipe(sourcemaps.init({loadMaps: true}))
	  .pipe(pug({ pretty: true }))
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest(`app/`))
	  .pipe(browsersync.reload({ stream: true }));
  });

gulp.task('js', function() {
	return gulp.src([
		'app/js/module.js', // Always at the end
		])
	.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('app.min.js'))
		//.pipe(uglify()) // Mifify js (opt.)
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('watch', ['styles', 'pug', 'js', 'browser-sync'], function() {
	gulp.watch('app/scss/**/*.scss', ['styles']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch(['libs/**/*.js', 'app/js/*.js'], ['js']);
	gulp.watch('app/*.html', browsersync.reload)
});

gulp.task('default', ['watch']);
