import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');

export default {
  entry: 'index.js',
  dest: 'dist/patterns.js',
  format: 'umd',
  moduleName: 'pattern',
  sourceMap: true,
  plugins: [
    babel(babelrc()),
    // istanbul({
    //   exclude: ['test/**/*', 'node_modules/**/*']
    // })
  ],
  external: Object.keys(pkg.dependencies)
};
