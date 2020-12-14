const { getQuiz, postQuiz, deleteQuiz } = require('../handlers')

const connectQuizRoutes = async (router) => {
  router.get('/quiz', getQuiz)
  router.post('/quiz', postQuiz)
  router.delete('/quiz', deleteQuiz)
}

module.exports = { connectQuizRoutes }
