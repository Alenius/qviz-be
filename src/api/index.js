const queries = require('../../../db/queries')

const api = async (app) => {
  app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.get('/questions', async (request, response) => {
    const questionId = request.query.id
    const allQuestions = await queries.getQuestions(questionId)
    response.json({ questions: allQuestions })
  })

  app.get('/answer', async (request, response) => {
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

module.exports = api
