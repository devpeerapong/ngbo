var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var browserSync = require('browser-sync');

var conf = require('./conf');



gulp.task('scripts', function () {
	var target = gulp.src([
		conf.paths.app + '/**/*.module.js',
		conf.paths.app + '/**/config/*.js',
		conf.paths.app + '/**/services/*.js',
		conf.paths.app + '/**/controllers/*.controller.js',
		conf.paths.app + '/**/directives/*.directive.js'
	]);
	
	return target
		.pipe($.plumber({
					handleError: function (err) {
						$.util(err);
						this.emit('end');
					}
				}))
	    .pipe($.jshint())
	    .pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail'))
	    .pipe(browserSync.reload({ stream: true }))
	    .pipe($.size());
});
