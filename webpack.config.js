 // ugly fix to get env variables to work, wanted to start weback from starter.js bt no success 
 require('dotenv/config')
 const StartServerPlugin = require('start-server-webpack-plugin')
 const webpack = require('webpack')

// the actual code is in the config files
let config
if (process.env.NODE_ENV === 'development')
  config = require('./config/webpack/dev')
else 
  config = require('./config/webpack/prod')

// config.plugins.push(new StartServerPlugin('server.js'))
// config.plugins.push(new webpack.DefinePlugin({
//   'process-env': {
//     'BUILD_TARGET': JSON.stringify('server')
//   }
// }))

module.exports = config