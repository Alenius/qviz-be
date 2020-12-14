const Joi = require('joi')
const {
  getAllQuizzes,
  getAllQuizzesByAuthor,
  getAllQuizzesByQuizName,
  getQuiz: getQuizQuery,
} = require('../../db/queries')

const schema = Joi.object({
  quizName: Joi.string(),
  author: Joi.string(),
})

const getQuiz = async (request, response) => {
  const { value, error: validationError } = schema.validate(request.query)

  if (validationError) {
    response.status(400).send(validationError.toString())
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
      const fetched = await getQuizQuery(quizName, author)
      response.send(fetched)
    }
  } catch (err) {
    console.error(err)
    response.status(500).send('Something went wrong when querying the database')
  }
}

module.exports = { getQuiz }
