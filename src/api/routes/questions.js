const { getAllQuestions } = require('../../services/getAllQuestionsFromQuiz')

const connectQuestionRoutes = async (router) => {
  router.get('/questions', async (request, response) => {
    const quizId = request.query.quizId
    if (!quizId) {
      response.status(400).send('Missing quizId parameter')
    }
    const allQuestions = await getAllQuestions(quizId)
    response.json({ questions: allQuestions })
  })
}

module.exports = { connectQuestionRoutes }
