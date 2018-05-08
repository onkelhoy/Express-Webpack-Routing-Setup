// import modules
const express = require('express')
const path = require('path')
const fs = require('fs')

// local 
const APP_PATH = path.resolve(__dirname, '..', 'apps')
const basic = require('./default')
const router = express.Router()
const applications = []

// INITIALIZE - get all apps in apps folder and route it!
fs.readdirSync(APP_PATH).map(app => {
  // check if app is directory [who knows..]
  if (fs.statSync(path.join(APP_PATH, app)).isDirectory()) {
    // we have the folder/project/route name !! [app]
    if (app !== 'default') applications.push(app)
    router.use('/'+app, basic(app))
  }
})

// base route (Tree View)
router.get('/', (req, res) => {
  res.sendFile(path.join(APP_PATH, 'default/index.html'))
}).get('/api/applications', (req, res) => {
  res.json(applications)
})

module.exports = { routes: router, applications } 