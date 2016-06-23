var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');


// Default
// =====================================

gulp.task('default',function() {

    //console.log( process.env);
});

// Build (only deal with HTML & Images)
// =====================================


gulp.task('build', ['copy'], function() {});


// Clean
// =====================================
gulp.task('clean', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['dist'], cb);
});



// Copy HTML
// =====================================
gulp.task('copy',['clean'], function() {
    
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    
  gulp.src('src/locales/**/*').pipe(gulp.dest('dist/locales'));  
  gulp.src('src/libs/**/*').pipe(gulp.dest('dist/libs'));  
  gulp.src('src/img/**/*').pipe(gulp.dest('dist/img')); 
});



// Image min
// =====================================
gulp.task('imgaemin', function() {
    
  gulp.src('src/img/**/*').pipe(imageop({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img'));
});

