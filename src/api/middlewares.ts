import { Application, RequestHandler } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'

var corsOptions = {
  origin: ['http://localhost:3000', 'https://qviz-game.herokuapp.com'],
}

export const auth: RequestHandler = (req, res, next) => {
  // get token from header if present
  const token = req.headers['x-access-token'] || req.headers['authorization']
  if (!token) {
    return res.status(401).send('No auth token found. Access denied.')
  }

  try {
    const privateKey: jwt.Secret = process.env.AUTH_PRIVATE_KEY ?? ''
    if (!privateKey) throw Error('No private key')
    const decoded = jwt.verify(token as string, privateKey)
    req.user = decoded as string
    next()
  } catch (err) {
    res.status(400).send('Invalid token')
  }
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
