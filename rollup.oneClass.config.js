import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './example/src/oneClass.js',
  output: {
    file: './example/dist/oneClass.js',
    name: 'oneClass',
    format: 'umd',
    minify: true,
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs(),
    babel()
  ]
};
