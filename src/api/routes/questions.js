const queries = require('../../db/queries')

const connectQuestionRoutes = async (router) => {
  router.get('/questions', async (request, response) => {
    console.log({ question: 'yeah' })
    const questionId = request.query.id
    const allQuestions = await queries.getQuestions(questionId)
    response.json({ questions: allQuestions })
  })
}

module.exports = { connectQuestionRoutes }
