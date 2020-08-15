require('dotenv').config()
const express = require('express')
const { connectRoutes } = require('./api')
const port = 4000

const startServer = () => {
  const app = express()

  const router = connectRoutes()
  app.use('/', router)
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
}

startServer()
