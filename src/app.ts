import res from 'dotenv'
import express from 'express'
import { connectRoutes } from './api'
import { applyMiddlewares } from './api/middlewares'
res.config({ path: `${process.cwd()}/config/.env` })
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
