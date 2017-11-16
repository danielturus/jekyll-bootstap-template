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
            `${rootDir}/**.html`,
            `${rootDir}/assets/js/**.js`,
            `${rootDir}/assets/img/*`,
            `${rootDir}/assets/img/**/*`,
            `${rootDir}/assets/static/**/*`,
            'https://fonts.googleapis.com/css?family=Raleway:400,700'
        ],
        stripPrefix: `${rootDir}`
    };

    swPrecache.write(path.join(rootDir, 'sw.js'), config, callback);
}

gulp.task('sw:dev', cb => writeServiceWorkerFile(true, cb));
gulp.task('sw:prod', cb => writeServiceWorkerFile(true, cb));


