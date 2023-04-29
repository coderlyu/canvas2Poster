const { formats, input, plugins } = require('./rollup.base.js')
const config = []
formats.forEach((conf, i) => {
  config.push({
    input,
    output: {
      ...conf
    },
    plugins: [...plugins]
  })
})

module.exports = config