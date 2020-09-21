const { Router, response } = require('express')
const { connectQuestionRoutes } = require('./routes/questions')
const { connectAnswerRoutes } = require('./routes/answers')
const { connectQuizRoutes } = require('./routes/quiz')

const connectRoutes = () => {
  const router = Router()

  connectQuestionRoutes(router)
  connectAnswerRoutes(router)
  connectQuizRoutes(router)

  router.get('/', (req, res) => {
    res.send('hello, welcome')
  })

  return router
}

module.exports = { connectRoutes }
