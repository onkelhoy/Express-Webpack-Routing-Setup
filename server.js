const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000
const { routes } = require('./routes/index')

app.set('view engine', 'html')
app.set('views', './apps')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)

app.use(express.static('./public'))

app.listen(PORT, function () {
  console.log('listen on ' + PORT)
})