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
    babel(),
    commonjs({
      namedExports: {
        './dist/telescope.min': [
          'before',
          'after',
          'tracker',
          'trackView',
          'trackEvent',
          'trackPage',
          'install',

          'pageTimeTracker',
          'actionTracker',
          'setConfig',
          'getConfig',

          'sendAsync',
          'send',
          'sendSync',

          'login',
          'logout'
        ]
      }
    })
  ]
};
