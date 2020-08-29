const { getAllQuestions } = require('../../services/getAllQuestionsFromQuiz')
const { createQuestion } = require('../../db/queries')

const connectQuestionRoutes = async (router) => {
  router.get('/questions', async (request, response) => {
    const quizId = request.query.quizId
    if (!quizId) {
      response.status(400).send('Missing quizId parameter')
    }
    const allQuestions = await getAllQuestions(quizId)
    response.json({ questions: allQuestions })
  })

  router.post('/questions', async (request, response) => {
    const { questionText, quizId } = request.body
    try {
      const inserted = await createQuestion(quizId, questionText)
      response.json({ ...inserted })
    } catch (err) {
      console.log(err)
      response
        .status(500)
        .send('Something went wrong when writing to the database')
    }
  })
}

module.exports = { connectQuestionRoutes }
