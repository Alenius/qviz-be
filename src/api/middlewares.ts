import { Application } from "express"
import bodyParser from 'body-parser'
import cors from 'cors'

var corsOptions = {
  origin: ['http://localhost:3000', 'https://qviz-game.herokuapp.com'],
}

export const applyMiddlewares = (app: Application) => {
  app.use(cors(corsOptions))
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
}
