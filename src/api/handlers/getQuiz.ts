import { Request, Response } from 'express'
import Joi from 'joi'
import { validateJoiSchema } from '../../utils'
import { GetQuizEndpointProps } from '../../../types'

const schema = Joi.object({
  quizName: Joi.string(),
  author: Joi.string(),
  id: Joi.string(),
})

export const getQuiz = async (request: Request, response: Response) => {
  const {
    value,
    error: validationError,
  } = validateJoiSchema<GetQuizEndpointProps>(schema, request.query)

  const db = request.db

  if (validationError) {
    response.status(400).send(validationError.toString())
  }

  const { quizName, author, id } = value

  try {
    // TODO: clean this up
    if (id) {
      const fetched = await db.getQuizById(id)
      response.send({ foundQuizzes: fetched })
    }

    if (!quizName && !author) {
      const fetched = await db.getAllQuizzes()
      response.send({ foundQuizzes: fetched })
    } else if (author && !quizName) {
      const fetched = await db.getAllQuizzesByAuthor(author)
      response.send({ foundQuizzes: fetched })
    } else if (quizName && !author) {
      const fetched = await db.getAllQuizzesByQuizName(quizName)
      response.send({ foundQuizzes: fetched })
    } else {
      const fetched = await db.getQuiz(quizName!, author!)
      response.send(fetched)
    }
  } catch (err) {
    response.status(500).send('Something went wrong when querying the database')
  }
}
