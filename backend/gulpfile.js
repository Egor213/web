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
const { exec } = require('child_process');

const db_users = require(path.join(__dirname, 'database','database_controllers', 'database_users_controller'));

const OUTDIR = 'build';

const paths = {
    styles: {
        src: path.join(__dirname, 'styles', '*.less'),
        dest: path.join(__dirname, OUTDIR, 'client', 'style')
    },
    html: {
        src: path.join(__dirname, 'views', '*.pug'),
        dest: path.join(__dirname, OUTDIR, 'html')
    },
    script: {
        src_server: [
            path.join(__dirname, 'js', '**', '*.js'),
            path.join(__dirname, 'app.js'),            
            path.join(__dirname, 'database', '**', '*.js')
        ],
        dest_server: path.join(__dirname, OUTDIR, 'server'),
        src_client: path.join(__dirname, 'static', 'js_pug', '*.js'),
        dest_client: path.join(__dirname, OUTDIR, 'client')
    },
    db: {
        original_path: path.join(__dirname, 'database', 'database_json', '*.json'),
        copy_path: path.join(__dirname, OUTDIR, 'server', 'database_json'),
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
            locals: {users:db_users.getAllUsers()}
        }))
        .pipe(clean_html())
        .pipe(gulp.dest(paths.html.dest)) 
    callback();
}

function render_scripts(callback) {
    gulp.src(paths.script.src_server)
        .pipe(babel({
            presets: [
                    ["@babel/preset-env"]
                ]
        }))
        .pipe(gulp.dest(paths.script.dest_server)) 
    gulp.src(paths.script.src_client)
        .pipe(babel({
            presets: [
                    ["@babel/preset-env"]
                ]
        }))
        .pipe(gulp.dest(paths.script.dest_client))
    callback();
}

function clean(callback) {
    fs_extra.emptyDirSync(OUTDIR);
    callback();
}

function copy_db() {
    return gulp.src(paths.db.original_path) 
        .pipe(gulp.dest(paths.db.copy_path)); 
}

function build(callback) {
    return parallel(render_style, render_scripts, render_html, copy_db)(callback);
}


exports.default = series(clean, build);
gulp.watch(["./styles/**/*.less", "./views/**/*.pug", "./js/**/**/*.js", "./app.js", "./database/**/*", "./static/**/*.js"], build);
