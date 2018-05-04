// the actual code is in the config files 

if (process.env.NODE_ENV === 'development')
  module.exports = require('./config/webpack/dev')
else 
  module.exports = require('./config/webpack/prod')