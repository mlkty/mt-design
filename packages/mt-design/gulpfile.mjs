import gulp from 'gulp';
import babel from 'gulp-babel';
import merge2 from 'merge2';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import getBabelConfig from './build/get-babel-config.mjs';

const sass = gulpSass(dartSass);

function compile(modules) {
    const isESM = modules === false;

    const source = [
        'src/**/*.tsx',
        'src/**/*.ts',
        '!src/**/demos/**/*.tsx',
        '!src/**/demos/**/*.ts',
    ];

    const tsCompile = gulp.src(source)
        .pipe(babel(getBabelConfig(modules)))
        .pipe(gulp.dest(isESM ? 'es' : 'lib'));

    const sassCompile = gulp.src([
        'src/**/*.scss',
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(isESM ? 'es' : 'lib'));

    return merge2(
        tsCompile,
        sassCompile
    );
}

gulp.task('compile-with-es', done => {
    console.info('[Parallel] Compile to es...');
    compile(false).on('finish', done);
});

gulp.task('compile-with-lib', done => {
    console.info('[Parallel] Compile to lib...');
    compile().on('finish', done);
});

gulp.task(
    'compile',
    gulp.series(
        gulp.parallel('compile-with-es', 'compile-with-lib')
    )
);
