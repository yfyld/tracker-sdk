import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const env = process.env.NODE_ENV;

export default {
  input: './src/index.ts',
  output: {
    file: './dist/tracker.min.js',
    name: 'tracker',
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
    typescript({
      tsconfig: "tsconfig.json"
    }),
    replace({
      ENV: JSON.stringify(env|| 'development')
    }),
    (env === 'production' && uglify())
  ]
};
