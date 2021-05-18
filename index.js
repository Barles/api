const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./app/routes/society.routes')(app)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
})
