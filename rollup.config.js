import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.mjs',
      format: 'esm',
    },
    plugins: [typescript()],
  },
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.cjs',
      format: 'cjs',
    },
    plugins: [typescript(), commonjs()],
  },
];
