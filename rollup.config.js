import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel';

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife',
        sourcemap: true
	},
    plugins: [
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonJS({
            include: 'node_modules/**',
        })
    ]
};