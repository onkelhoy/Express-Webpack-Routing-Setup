// import modules
const path = require('path')
const StartServerPlugin = require('start-server-webpack-plugin')

// local modules
const config = require('./default')

config.devServer = {
  port: process.env.WEBPACK_PORT || 3001,
  hot: true,
  stats: 'errors-only',
  inline: true,
  proxy: { 
    '*': `http://localhost:${process.env.SERVER_PORT || 3000}/` // correct ? 
  },
  contentBase: path.join(__dirname, '..', 'apps')
}
config.devtool = 'cheap-eval-source-map'
for (let app in config.entry) {
  config.entry[app] = ['webpack/hot/only-dev-server', config.entry[app]]
}
// config.entry.server = path.join(__dirname, '..', '..', 'server')
// config.plugins.push(new StartServerPlugin('server.js'))

module.exports = config