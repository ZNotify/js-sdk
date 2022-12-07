import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'

/** @type {import('rollup').RollupOptions} */
const jsConfig = {
    input: 'src/index.ts',
    plugins: [json(), esbuild()],
    external: ["qs", "axios"],
    output: [
        {
            file: `dist/znotify.js`,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: `dist/znotify.mjs`,
            format: 'es',
            sourcemap: true,
        },
    ],
}

/** @type {import('rollup').RollupOptions} */
const dtsConfig = {
    input: 'src/index.ts',
    plugins: [dts()],
    output: {
        file: `dist/znotify.d.ts`,
        format: 'es',
    },
}

export default [jsConfig, dtsConfig]
