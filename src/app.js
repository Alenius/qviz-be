require('dotenv').config()
const express = require('express')
const { connectRoutes } = require('./api')
const { applyMiddlewares } = require('./api/middlewares')
const port = 4000

const startServer = () => {
  const app = express()
  applyMiddlewares(app)

  const router = connectRoutes()
  app.use('/', router)
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
}

startServer()
