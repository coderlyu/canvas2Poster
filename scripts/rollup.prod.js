const {formats, input, plugins } = require('./rollup.base.js')
const terser = require('@rollup/plugin-terser')
// const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const config = []
formats.forEach((conf, i) => {
  // if(conf.format === 'umd')
  config.push({
    input,
    output: {
      ...conf
    },
    plugins: [...plugins, terser()]
  })
})

module.exports = config