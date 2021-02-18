import { Request, Response } from 'express'
import Joi from 'joi'
import {
  getAllQuizzes,
  getAllQuizzesByAuthor,
  getAllQuizzesByQuizName,
  getQuiz as getQuizQuery,
  getQuizById,
} from '../../db/queries'
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

  if (validationError) {
    response.status(400).send(validationError.toString())
  }

  const { quizName, author, id } = value

  try {
    // TODO: clean this up
    if (id) {
      const fetched = await getQuizById(id)
      response.send({ foundQuizzes: fetched })
    }

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
      const fetched = await getQuizQuery(quizName!, author!)
      response.send(fetched)
    }
  } catch (err) {
    response.status(500).send('Something went wrong when querying the database')
  }
}
