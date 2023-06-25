import { rollup } from 'rollup';
import gulp from 'gulp';
import babel from 'gulp-babel';
import merge2 from 'merge2';
import ts from 'gulp-typescript';

import { babel as rollupBabel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import getBabelConfig from './build/get-babel-config.mjs';
import getTSConfig from './build/get-ts-config.mjs';
import { getProjectPath } from './build/get-project-helper.mjs';

const tsConfig = getTSConfig();

const tsDefaultReporter = ts.reporter.defaultReporter();

const esDir = getProjectPath('es');
const libDir = getProjectPath('lib');

function compile(modules) {
  const isESM = modules === false;
  const buildDir = isESM ? esDir : libDir;

  let error = 0;

  const source = [
    'src/**/*.tsx',
    'src/**/*.ts',
    '!src/**/demos/**/*.tsx',
    '!src/**/demos/**/*.ts',
  ]

  // ======= ts/tsx =======
  const tsCompile = gulp.src(source)
    .pipe(babel(getBabelConfig(modules)))
    .pipe(gulp.dest(buildDir));

  // ======= dts =======
  const tsResult = gulp.src(source).pipe(
    ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e);
        error = 1;
      },
      finish: tsDefaultReporter.finish,
    })
  );

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);

  const dtsCompile = tsResult.dts.pipe(gulp.dest(buildDir));

  return merge2(
    tsCompile,
    dtsCompile,
  )
}

gulp.task('dist', async done => {
  console.log('[Parallel] Compile to dist...');
  const extensions = ['.ts', '.tsx', '.js', '.mjs'];
  const input = getProjectPath('src/index.ts');
  const bundle = await rollup({
    input,
    external: ['react', 'react-dom'],
    plugins: [
      rollupBabel({
        extensions,
        babelHelpers: 'runtime',
        ...getBabelConfig(),
      }),
      commonjs(),
      nodeResolve({
        extensions,
      }),
      terser({
        compress: true,
        mangle: true,
      }),
    ]
  });

  await bundle.write({
    file: 'dist/index.min.js',
    format: 'umd',
    name: 'MTUtils',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    compact: true,
  });
  console.log('finish')
  done();
});

gulp.task('compile-with-es', done => {
  console.log('[Parallel] Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', done => {
  console.log('[Parallel] Compile to lib...');
  compile().on('finish', done);
});

gulp.task(
  'build',
  gulp.series(
    gulp.parallel(
      'compile-with-es',
      'compile-with-lib',
      'dist',
    ),
  )
);
