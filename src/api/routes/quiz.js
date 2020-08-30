const { createQuiz } = require('../../db/queries')
const Joi = require('joi')

const connectQuizRoutes = async (router) => {
  router.post('/quiz', async (request, response) => {
    const { value, error: validationError } = Joi.object({
      quizName: Joi.string().required(),
      author: Joi.string().required(),
    }).validate(request.body)

    if (validationError) {
      return response.status(500).send(String(validationError))
    }

    try {
      const { quizName, author } = value
      const { quiz_id: quizId } = await createQuiz(quizName, author)
      response.send({ quizId })
    } catch (err) {
      console.error(err)

      // handle unique constraint
      if (err.code === '23505') {
        response
          .status(403)
          .send(
            'There already exists a combination of that quiz name and author in the database'
          )
      }

      response
        .status(500)
        .send('Something went wrong when inserting the quiz into the database')
    }
  })
}

module.exports = { connectQuizRoutes }
