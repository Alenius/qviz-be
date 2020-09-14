const { getAllQuestions } = require('../../services/getAllQuestionsFromQuiz')
const { insertQuestionAndAnswer } = require('../../db/queries')
const Joi = require('joi')
const { forEach } = require('ramda')

const connectQuestionRoutes = async (router) => {
  router.get('/questions', async (request, response) => {
    const quizId = request.query.quizId
    const { value, error: validationError } = Joi.object({
      quizId: Joi.string().required(),
    }).validate(request.query)

    if (validationError) {
      return response.status(500).send(String(validationError))
    }

    if (!quizId) {
      response.status(400).send('Missing quizId parameter')
    }
    console.log({ value })
    const allQuestions = await getAllQuestions(value.quizId)
    console.log({ allQuestions })
    response.json({ questions: allQuestions })
  })

  router.post('/questions', async (request, response) => {
    const { value, error: validationError } = Joi.object({
      questions: Joi.array()
        .items(
          Joi.object({
            questionText: Joi.string().required(),
            quizId: Joi.string().required(),
            acceptedAnswers: Joi.string().required(),
            extraInfo: Joi.string(),
          })
        )
        .required(),
    }).validate(request.body)

    if (validationError) {
      return response.status(500).send(String(validationError))
    }

    const { questions } = value

    try {
      forEach(async (question) => {
        const {
          questionText,
          quizId,
          acceptedAnswers,
          extraInfo = '',
        } = question
        await insertQuestionAndAnswer(
          quizId,
          questionText,
          acceptedAnswers,
          extraInfo
        )
      }, questions)
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
