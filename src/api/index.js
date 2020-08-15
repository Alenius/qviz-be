const { Router } = require('express')
const { connectQuestionRoutes } = require('./routes/questions')
const { connectAnswerRoutes } = require('./routes/answers')

const connectRoutes = () => {
  const router = Router()

  connectQuestionRoutes(router)
  connectAnswerRoutes(router)

  return router
}

module.exports = { connectRoutes }
