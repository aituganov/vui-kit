import babel from '@rollup/plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

export default () => {
  let config = [{
    input: 'src/components/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/library.mjs',
      exports: 'named'
    },
    external: ['vue'],
    plugins: [
      scss({
        failOnError: true,
        output: 'dist/common.css',
        runtime: require('sass'),
      }),
      resolve({
        extensions: ['.vue', '.ts']
      }),
      typescript({
        tsconfig: 'tsconfig.json'
      }),
      vue({
        template: {
          isProduction: true,
          compilerOptions: {
            whitespace: 'condense'
          }
        }
      }),
      babel({
        babelHelpers: 'bundled'
      }),
      cjs()
    ]
  }]

  if (process.env.MINIFY === 'true') {
      config = config.filter((c) => !!c.output.file)
      config.forEach((c) => {
          c.output.file = c.output.file.replace(/\.m?js/g, r => `.min${r}`)
          c.plugins.push(terser({
              output: {
                  comments: '/^!/'
              }
          }))
      })
  }
  return config
}