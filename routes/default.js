// import modules
const express = require('express')
const path = require('path')
const fs = require('fs')

// locals
const APP_SOURCE_PATH = path.resolve(__dirname, '..', 'apps')

/**
 * Creates a new route for given application
 * Can even have its own config if there is a file under apps with the same name !
 * 
 * @param {string} application 
 */
function setup (application) {
  // check if we have a config file
  const config_path = path.join(__dirname, 'apps', application+'.js')
  if (fs.existsSync(config_path))
    return configSetup(application, config_path)
  else 
    return defaultSetup(application)
}


/**
 * Sets up the route with basic/default setup
 * it will only serve the file
 * @param {string} application 
 */
function defaultSetup (application) {
  const route = express.Router()
  route.use(express.static(path.join(APP_SOURCE_PATH, application)))
  route.get('/', (req, res) => {
    res.sendFile(path.join(APP_SOURCE_PATH, application, 'index.html'))
  })
  return route
}
/**
 * Sets up the route with custom setup
 * @param {string} application 
 * @param {string} config_path 
 */
function configSetup (application, config_path) {
  console.log('yes ' + application + ' has its own conf')
  return require(config_path)(application)
}


module.exports = setup