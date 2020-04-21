import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
const env = JSON.stringify(process.env.NODE_ENV || 'development');
export default {
  input: './src/index.ts',
  output: {
    file: './dist/telescope.min.js',
    name: 'Telescope',
    format: 'umd',
    minify: true,
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
      exclude: /lodash-es/
    }),
    replace({
      'process.env.NODE_ENV': env
    }),

    typescript({
      tsconfig: 'tsconfig.json',
      objectHashIgnoreUnknownHack: true
    }),

    env === 'production' && terser(),
    visualizer({
      filename: './statistics.html',
      title: 'My Bundle',
      sourcemap: true
    })
  ]
};
