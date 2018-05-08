// importing the modules
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const MAIN_PATH = path.resolve(__dirname, '..', '..')
const SOURCE_PATH = path.join(MAIN_PATH, 'source')

// the default config (same for both dev & prod ...I think for now)
const config = {
  mode: process.env.NODE_ENV,
  context: SOURCE_PATH,
  entry: {},
  watch: true,
  output: {
    filename: '[name]/bundle.js',
    path: path.join(MAIN_PATH, 'apps')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /source/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        include: /source/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.pug$/,
        include: /source/,
        exclude: /node_modules/,
        use: ['html-loader', 'pug-html-loader']
      }
    ]
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()]
}

// get all files|directories and check which ones are not files
fs.readdirSync(SOURCE_PATH).map(app => {
  // check if the path is directory
  if (fs.statSync(path.join(SOURCE_PATH, app)).isDirectory()) {
    config.entry[app] = `./${app}/app.js`
    
    // check the files within for template file
    const DIR_PATH = path.join(SOURCE_PATH, app)
    const rgx = /^template(\.\w*)*\.(\w*)$/ 
    let template = null
    fs.readdirSync(DIR_PATH).map(f => {
      template = rgx.exec(f)
      if (template) return // takes the first match
    })

    if (!template)
      throw new Error('There is no template file in your project: ' + app)
    const EXT = template[2] // takes the extension
    // now we push to plugins
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: app + '/index.html',
        template: path.join(DIR_PATH, 'template.'+EXT),
        title: app,
        chunks: [app],
      })
    )
  }
})

module.exports = config 



