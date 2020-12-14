const Joi = require('joi')
const { getAllQuestions } = require('../../services/getAllQuestionsFromQuiz')
const { getQuizName } = require('../../db/queries')

const schema = Joi.object({
  quizId: Joi.number().required(),
})

const getQuestions = async (request, response) => {
  const quizId = request.query.quizId
  const { value, error: validationError } = schema.validate(request.query)

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  if (!quizId) {
    response.status(400).send('Missing quizId parameter')
  }
  const allQuestions = await getAllQuestions(value.quizId)
  const quizName = await getQuizName(quizId)
  response.json({ quizName, questions: allQuestions })
}

module.exports = { getQuestions }
