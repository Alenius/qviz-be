const { getQuestions, postQuestions } = require('../handlers')

const connectQuestionRoutes = async (router) => {
  router.get('/questions', getQuestions)
  router.post('/questions', postQuestions)
}

module.exports = { connectQuestionRoutes }
