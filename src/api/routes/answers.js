const queries = require('../../db/queries')

const connectAnswerRoutes = (router) => {
  router.get('/answer', async (request, response) => {
    const { quizId, questionId, userAnswer } = request.query
    const {
      correctAnswer,
      rating,
      userAnswerWasCorrect,
    } = await queries.checkAnswerForQuestion({
      quizId,
      questionId,
      userAnswer,
    })
    response.json({ userAnswer, rating, correctAnswer, userAnswerWasCorrect })
  })
}

module.exports = { connectAnswerRoutes }
