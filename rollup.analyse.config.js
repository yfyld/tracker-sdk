import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';
const env = process.env.NODE_ENV;

export default {
  entry: './src/analyse/index.ts',
  output: {
    file: './dist/analyse.min.js',
    name: 'tracker',
    format: 'umd',
    minify: true,
    sourcemap: true
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json"
    }),
    replace({
      ENV: JSON.stringify(env|| 'development')
    }),
    (env === 'production' && uglify())
  ]
};
