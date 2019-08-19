(() => {

  'use strict';

  const gulp = require('gulp');
  const browsersync   = require('browser-sync').create();

  const files = [
    './index.html',
    './js/*.js',
    './css/*.css',
    './inc/*.html',
	'./inc/*/*.html'
  ];
  
  function watch (){
    browsersync.init({
      server: {
        baseDir   : './',
        index     : 'index.html'
      },
      port        : 3000,
      open        : false
    });
  }
  
  gulp.watch(files).on('change', browsersync.reload);
  const dev = gulp.series(watch);

  exports.default = dev;

})();