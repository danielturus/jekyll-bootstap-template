'use strict';


const gulp = require('gulp');
const path = require('path');
const swPrecache = require('sw-precache');
const packageJson = require('./package.json');

const rootDir = 'dist';

const writeServiceWorkerFile = (handleFetch, callback) => {
    const config = {
        cacheId: packageJson.name,
        handleFetch,
        runtimeCaching: [{
            urlPattern: /runtime-caching/,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxEntries: 1,
                    name: 'runtime-cache'
                }
            }
        }],
        staticFileGlobs: [
            `${rootDir}/*/404/*`,
            `${rootDir}/assets/js/**.js`,
            `${rootDir}/assets/img/*`,
            `${rootDir}/assets/img/**/*`,
            `${rootDir}/404/**.html`,
            `${rootDir}/assets/static/**/*`,
            `https://fonts.googleapis.com/css?family=Raleway:400,700`
        ],
        stripPrefix: `${rootDir}`
    };

    swPrecache.write(path.join(rootDir, 'sw.js'), config, callback);
}

gulp.task('sw:dev', cb => writeServiceWorkerFile(true, cb));
gulp.task('sw:prod', cb => writeServiceWorkerFile(true, cb));

var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
var imageminGiflossy = require('imagemin-giflossy');

//compress all images
gulp.task('imagemin', function () {
    return gulp.src(['src/assets/img/**/*.{gif,png,jpg,jpeg}'])
        .pipe(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: 98 //lossy settings
            }),
            imageminZopfli({
                more: true
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 90
            })
        ]))
        .pipe(gulp.dest('dist/assets/img/'));
});