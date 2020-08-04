const bodyParser = require('body-parser')
const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:3000',
}

const applyMiddlewares = (app) => {
  app.use(cors(corsOptions))
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
}

module.exports = { applyMiddlewares }
