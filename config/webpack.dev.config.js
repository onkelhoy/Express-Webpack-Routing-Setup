/**
 * importing the modules
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

/**
 * get the sub directories of give path
 * 
 * @param {string} p 
 */
const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
const apps = dirs(path.resolve(__dirname, '..', 'source'))

const entry = {}
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

for (let app of apps) {
  entry[app] = `./${app}/app.js`
  plugins.push(new HtmlWebpackPlugin({
    filename: app + '/index.html',
    template: path.resolve(__dirname, '..', 'source', app, 'index.pug'),
    title: app,
    chunks: [app],
  }))
}

module.exports = {
  entry, plugins
}