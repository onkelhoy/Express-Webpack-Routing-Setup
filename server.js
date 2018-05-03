const express = require('express')
const app = express()
const PORT = process.env.NODE_ENV || 3000


app.listen(PORT, function () {
  console.log('listen on ' + PORT)
})