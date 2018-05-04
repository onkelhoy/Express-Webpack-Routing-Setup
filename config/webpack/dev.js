const config = require('./default')

config.devServer = {
  port: process.env.WEBPACK_PORT || 3001,
  hot: true,
  stats: 'errors-only',
  inline: true,
  proxy: { 
    '*': `http://localhost:${process.env.SERVER_PORT || 3000}/` // correct ? 
  },
  contentBase: path.join(__dirname, 'apps')
}
config.devtool = 'cheap-eval-source-map'


module.exports = config