const Joi = require('joi')
const { deleteQuiz: deleteQuizQuery, getQuizById } = require('../../db/queries')

const schema = Joi.object({
  quizId: Joi.number().required(),
})

const deleteQuiz = async (request, response) => {
  const { value, error: validationError } = schema.validate(request.body)

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { quizId } = value

  try {
    const exists = (await getQuizById(quizId)).length !== 0
    if (!exists) {
      response.status(404).send('No quiz with that id found')
    }
    await deleteQuizQuery(quizId)
    response.status(200).send({ quizId })
  } catch (err) {
    console.log(err)
    response.status(500).send('Something went wrong when deleting the quiz')
  }
}

module.exports = { deleteQuiz }
