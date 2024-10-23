const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const clean_css = require('gulp-clean-css');
const pug = require('gulp-pug');
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const clean_html = require("gulp-htmlmin");
const fs_extra = require('fs-extra');
const { series, parallel } = require('gulp');

const OUTDIR = 'build';

const paths = {
    styles: {
        src: path.join(__dirname, 'styles', '*.less'),
        dest: path.join(__dirname, OUTDIR, 'style')
    },
    html: {
        src: path.join(__dirname, 'views', '*.pug'),
        dest: path.join(__dirname, OUTDIR, 'html')
    },
    script: {
        src_server: path.join(__dirname, 'js', '**', '*.js'),
        dest_server: path.join(__dirname, OUTDIR, 'js', 'server'),
        src_client: path.join(__dirname, '..', 'frontend', 'public', 'frontend_js', '*.js'),
        dest_client: path.join(__dirname, OUTDIR, 'js', 'client'),
        src_app: path.join(__dirname, 'app.js'),
        dest_app: path.join(__dirname, OUTDIR, 'js'),
        src_database: path.join(__dirname, 'database', '**', '*.js'),
        dest_database: path.join(__dirname, OUTDIR, 'js', 'server'),
        src_static_server: path.join(__dirname, 'static', 'js_pug', '*.js'),
        dest_static_server: path.join(__dirname, OUTDIR, 'js')
    }
}

function render_style(callback) {
    gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(clean_css())
        .pipe(gulp.dest(paths.styles.dest));  
    callback();
}

function render_html(callback) {
    gulp.src(paths.html.src)
        .pipe(pug({
            data: {
                DIR: OUTDIR
            }
        }))
        .pipe(clean_html())
        .pipe(gulp.dest(paths.html.dest))  
    callback();
}

function render_scripts(callback) {
    gulp.src(paths.script.src_client)
        .pipe(babel({
            presets: ['@babel/preset-env'] 
        }))
        // .pipe(concat('client.js'))
        .pipe(gulp.dest(paths.script.dest_client)) 
    gulp.src(paths.script.src_server)
        .pipe(babel({
            presets: ['@babel/preset-env'] 
        }))
        // .pipe(concat('server.js'))
        .pipe(gulp.dest(paths.script.dest_server)) 
    gulp.src(paths.script.src_database)
        .pipe(babel({
            presets: ['@babel/preset-env'] 
        }))
        // .pipe(concat('server.js'))
        .pipe(gulp.dest(paths.script.dest_database)) 
    gulp.src(paths.script.src_app)
        .pipe(babel({
            presets: ['@babel/preset-env'] 
        }))
        // .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.script.dest_app))  
    gulp.src(paths.script.src_static_server)
        .pipe(babel({
            presets: [
                ["@babel/preset-env"]
            ]
        }))
        // .pipe(concat('index.js'))
        .pipe(gulp.dest(paths.script.dest_static_server)) 
    callback();
}

function clean(callback) {
    fs_extra.emptyDirSync(OUTDIR);
    callback();
}

function build(callback) {
    return parallel(render_style, render_scripts, render_html)(callback);
}

exports.default = series(clean, build);
gulp.watch(["./styles/**/*.less", "./views/**/*.pug", "./js/**/*.js"], build);
