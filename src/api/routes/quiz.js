const {
  createQuiz,
  getQuiz,
  getAllQuizzesByQuizName,
  getAllQuizzesByAuthor,
} = require('../../db/queries')
const Joi = require('joi')

const connectQuizRoutes = async (router) => {
  router.get('/quiz', async (request, response) => {
    const { value, error: validationError } = Joi.object({
      quizName: Joi.string(),
      author: Joi.string(),
    }).validate(request.query)

    if (validationError) {
      response.status(400).send(String(validationError))
    }

    const { quizName, author } = value

    try {
      if (author && !quizName) {
        const fetched = await getAllQuizzesByAuthor(author)
        response.send({ foundQuizzes: fetched })
      } else if (quizName && !author) {
        const fetched = await getAllQuizzesByQuizName(quizName)
        response.send({ foundQuizzes: fetched })
      } else {
        const fetched = await getQuiz(quizName, author)
        response.send(fetched)
      }
    } catch (err) {
      console.error(err)
      response
        .status(500)
        .send('Something went wrong when querying the database')
    }
  })

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
