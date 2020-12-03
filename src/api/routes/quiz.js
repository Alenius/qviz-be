const {
  createQuiz,
  getQuiz,
  getAllQuizzesByQuizName,
  getAllQuizzesByAuthor,
  getAllQuizzes,
  deleteQuiz,
  getQuizById,
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
      if (!quizName && !author) {
        const fetched = await getAllQuizzes()
        response.send({ foundQuizzes: fetched })
      } else if (author && !quizName) {
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
      questionEntities: Joi.array()
        .items(
          Joi.object({
            questionText: Joi.string().required(),
            acceptedAnswers: Joi.string().required(),
            extraInfo: Joi.string().allow(''),
          })
        )
        .required(),
    }).validate(request.body)

    if (validationError) {
      return response.status(500).send(String(validationError))
    }

    const { quizName, author, questionEntities } = value

    try {
      const { quizId } = await createQuiz(quizName, author, questionEntities)
      response.send(
        `Question and answer inserted into the database with quizId ${quizId}`
      )
    } catch (err) {
      console.log(err)
      response
        .status(500)
        .send('Something went wrong when writing to the database')
    }
  })

  router.delete('/quiz', async (request, response) => {
    const { value, error: validationError } = Joi.object({
      quizId: Joi.number().required(),
    }).validate(request.body)

    if (validationError) {
      return response.status(500).send(String(validationError))
    }

    const { quizId } = value

    try {
      const exists = (await getQuizById(quizId)).length !== 0
      if (!exists) {
        response.status(404).send('No quiz with that id found')
      }
      await deleteQuiz(quizId)
      response.status(200).send({ quizId })
    } catch (err) {
      console.log(err)
      response.status(500).send('Something went wrong when deleting the quiz')
    }
  })
}

module.exports = { connectQuizRoutes }
