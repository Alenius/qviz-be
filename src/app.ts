import express from 'express'
import { connectRoutes } from './api'
import { applyMiddlewares } from './api/middlewares'
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
