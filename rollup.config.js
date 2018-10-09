import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import debug from 'debug';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';


import pkg from './package.json';
console.log( `running version ${pkg.version}` );

const env = process.env.NODE_ENV


export default {
  input: './src/index.js',
  output: {
    file: './dist/tracker.min.js',
    name:'tracker',
    format: 'umd',
    minify:true,
    sourcemap:true
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),

    json(),

    replace({
      ENV: JSON.stringify(env|| 'development')
    }),
    (env === 'production' && uglify()),
    serve({
      open: false,
      contentBase: './',
      historyApiFallback: false,
      host: '0.0.0.0',
      port: 10001
    })
  ]
}
