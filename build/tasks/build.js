/**
 * build
 * copy src files to output path
 */

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

require('./clean');

gulp.task(
  'build',
  gulp.series('clean', async function () {
    const { OUTPUT_PATH, ROOT_PATH, SRC_PATH } = require('../constants');

    // Copy other files to output
    await new Promise((resolve) => {
      gulp.src(path.join(SRC_PATH, '**/*')).pipe(gulp.dest(OUTPUT_PATH)).on('end', resolve);
    });

    // Copy npm publish files to output
    await new Promise((resolve) => {
      gulp
        .src(['README.md'].map((x) => path.join(ROOT_PATH, x)))
        .pipe(gulp.dest(OUTPUT_PATH))
        .on('end', resolve);
    });

    // Write package.json file to output
    const pkg = require('../../package.json');
    if (pkg.scripts) {
      pkg.scripts = Object.keys(pkg.scripts).reduce((prev, key) => {
        if (key !== 'prepare' || pkg.scripts[key].indexOf('husky install') < 0) {
          prev[key] = pkg.scripts[key];
        }
        return prev;
      }, {});
    }
    fs.writeFileSync(path.join(OUTPUT_PATH, 'package.json'), JSON.stringify(pkg, null, 2), { encoding: 'utf8' });
  })
);
