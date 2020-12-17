import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/vue-g2plot.es.js',
      format: 'es',
      name: '$vueG2plot',
    },
    {
      file: 'dist/vue-g2plot.js',
      format: 'umd',
      name: '$vueG2plot',
    },
    {
      file: 'dist/vue-g2plot.iife.js',
      format: 'iife',
      name: '$vueG2plot',
    },
  ],
  plugins: [
    resolve({ extensions: ['.vue'] }),
    vue({
      style: {
        postcssPlugins: [
          autoprefixer(),
        ],
      },
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
    }),
    commonjs(),
  ],
};
