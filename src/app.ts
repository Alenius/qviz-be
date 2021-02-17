import express from 'express'
import { connectRoutes } from './api'
import { applyGeneralMiddlewares } from './api/middlewares'
import { setup } from './setup'
const port = process.env.PORT || 4000

const startServer = () => {
  const app = express()

  const { db } = setup()
  app.request.db = db

  applyGeneralMiddlewares(app)

  const router = connectRoutes()
  app.use('/', router)
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
}

startServer()
