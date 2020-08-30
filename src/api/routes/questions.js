const { getAllQuestions } = require('../../services/getAllQuestionsFromQuiz')
const { createQuestion, createAnswer } = require('../../db/queries')
const Joi = require('joi')

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
    const { value, error: validationError } = Joi.object({
      questionText: Joi.string().required(),
      quizId: Joi.string().required(),
      acceptedAnswers: Joi.string().required(),
      extraInfo: Joi.string(),
    }).validate(request.body)

    if (validationError) {
      return response.status(500).send(String(validationError))
    }

    const { questionText, quizId, acceptedAnswers, extraInfo = '' } = value

    try {
      const insertedQuestion = await createQuestion(quizId, questionText)
      const { questionId } = insertedQuestion
      await createAnswer(acceptedAnswers, extraInfo, questionId)
      response.send('Question and answer inserted into the database')
    } catch (err) {
      console.log(err)
      response
        .status(500)
        .send('Something went wrong when writing to the database')
    }
  })
}

module.exports = { connectQuestionRoutes }
