const webpack = require('webpack')
const path = require('path')

if (process.env.NODE_ENV === 'production') 
{
  const config = require(path.resolve(__dirname, '..', 'config', 'webpack', 'prod.js'))

  
  webpack(config)
  require('../server')
}
else 
{
  require('../server')
}