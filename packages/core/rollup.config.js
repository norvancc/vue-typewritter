import path from 'path';
import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.ts',

  output: [
    {
      file: path.resolve(__dirname, './dist/index.mjs'),
      sourcemap: true,
      format: 'es',
    },
    {
      file: path.resolve(__dirname, './dist/index.cjs'),
      sourcemap: true,
      format: 'cjs',
    },
  ],

  plugins: [ts(), terser()],
};
