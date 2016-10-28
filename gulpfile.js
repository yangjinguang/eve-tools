'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('run', ()=> {
    browserSync({
        open: false,
        server: {
            baseDir: 'client/',
            routes: {
                "/bower_components": "./bower_components"
            }
        },
        notify: false,
        port: 9999,
        ui: false,// 关闭ui界面
        ghostMode: false,// 关闭所有同步选项
        logPrefix: 'LOCAL SERVE'
    });
});
