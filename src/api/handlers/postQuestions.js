const Joi = require('joi')
const { forEach } = require('ramda')

const { insertQuestionAndAnswer } = require('../../db/queries')

const schema = Joi.object({
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
})

const postQuestions = async (request, response) => {
  const { value, error: validationError } = schema.validate(request.body)

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { questions } = value

  try {
    forEach(async (question) => {
      const { questionText, quizId, acceptedAnswers, extraInfo = '' } = question
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
}

module.exports = { postQuestions }
