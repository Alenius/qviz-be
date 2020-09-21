const res = require('dotenv').config({ path: `${process.cwd()}/config/.env` })
const express = require('express')
const { connectRoutes } = require('./api')
const { applyMiddlewares } = require('./api/middlewares')
const port = process.env.PORT || 4000

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
