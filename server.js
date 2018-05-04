const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use('/', require('./routes/index'))

app.listen(PORT, function () {
  console.log('listen on ' + PORT)
})