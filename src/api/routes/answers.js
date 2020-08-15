const { checkAnswer } = require('../../services/checkAnswer')

const connectAnswerRoutes = (router) => {
  router.get('/answer', async (request, response) => {
    const { quizId, questionId, userAnswer } = request.query
    const { correctAnswer, rating, userAnswerWasCorrect } = await checkAnswer({
      quizId,
      questionId,
      userAnswer,
    })
    response.json({ userAnswer, rating, correctAnswer, userAnswerWasCorrect })
  })
}

module.exports = { connectAnswerRoutes }
