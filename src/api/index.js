const { Router } = require('express')
const { connectQuestionRoutes } = require('./routes/questions')
const { connectAnswerRoutes } = require('./routes/answers')
const { connectQuizRoutes } = require('./routes/quiz')

const connectRoutes = () => {
  const router = Router()

  connectQuestionRoutes(router)
  connectAnswerRoutes(router)
  connectQuizRoutes(router)

  return router
}

module.exports = { connectRoutes }
