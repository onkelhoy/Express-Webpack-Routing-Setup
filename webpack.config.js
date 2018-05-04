const path = require('path')
const devConfig = require('./config/webpack.dev.config') // not really dev config.. fix this later ! 


const config = {
  devtool: 'cheap-eval-source-map',
  context: path.join(__dirname, 'source'),
  mode: process.env.NODE_ENV,
  entry: devConfig.entry,
  output: {
    filename: '[name]/bundle.js',
    path: path.join(__dirname, 'apps')
  },

  devServer: {
    port: process.env.WEBPACK_PORT || 3001,
    hot: true,
    stats: 'errors-only',
    inline: true,
    proxy: { 
      '*': `http://localhost:${process.env.SERVER_PORT || 3000}/` // correct ? 
    },
    contentBase: path.join(__dirname, 'apps')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /apps/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        include: /apps/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      }
    ]
  },
  plugins: devConfig.plugins
}

module.exports = config 