"use strict"
/**
 * --------------------------------------------------------------------
 * Copyright 2015 Nikolay Mavrenkov
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * --------------------------------------------------------------------
 *
 * Author:  Nikolay Mavrenkov <koluch@koluch.ru>
 * Created: 03.11.2015 22:56
 */
var gulp = require("gulp")
    //gutil = require("gulp-util"),
    //uglify = require("gulp-uglify"),
    //browserify = require("browserify"),
    //source = require("vinyl-source-stream"),
    //watchify = require("watchify"),
    //anybar = require("anybar"),
    //fs = require("fs"),
    //notifier = require("node-notifier"),
    //merge = require("gulp-merge"),
    ,packageJson = require("./package.json") || {}
    ,eslint = require("gulp-eslint")
    ,gulpIf = require("gulp-if")
    ,babel = require("gulp-babel")

    ;


// Read settings from package.json
var settingsGulp = packageJson.gulp || {}
var settingsSrc = settingsGulp.src || {}
var settingsProd = settingsGulp.prod || {}

var SRC_ROOT = settingsSrc.root
var PROD_ROOT = settingsProd.root

function onError(err) {
    gutil.log(gutil.colors.red(err.message))
}

gulp.task("scripts", function() {

    return gulp.src(SRC_ROOT + "/**.js")
                .pipe(babel({
                    presets: ["es2015"],
                }))
                .pipe(gulp.dest(PROD_ROOT))
})

gulp.task('lint', function() {
    return gulp.src(SRC_ROOT + '/**').pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});


gulp.task('lint-n-fix', function() {
    function isFixed(file) {
        return file.eslint != null && file.eslint.fixed
    }
    return gulp.src(SRC_ROOT + '/**').pipe(eslint({fix:true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(SRC_ROOT)))
});


gulp.task("default", ["lint", "scripts"])