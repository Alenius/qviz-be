import { Request, Response } from 'express'
import { validateJoiSchema } from '../../utils'
import { PostQuizEndpointProps } from '../../../types'

import Joi from 'joi'

const schema = Joi.object({
  quizName: Joi.string().required(),
  questionEntities: Joi.array()
    .items(
      Joi.object({
        questionText: Joi.string().required(),
        acceptedAnswers: Joi.string().required(),
        extraInfo: Joi.string().allow(''),
      })
    )
    .required(),
})

export const postQuiz = async (request: Request, response: Response) => {
  const {
    value,
    error: validationError,
  } = validateJoiSchema<PostQuizEndpointProps>(schema, request.body)

  const db = request.db

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { quizName, questionEntities } = value
  const user = request.user // get user from token

  if (!user) {
    return response.status(401).send('No auth token found. Access denied.')
  }

  console.log({ user })

  try {
    const { quizId } = await db.insertQuiz(
      quizName,
      user.userId,
      questionEntities
    )
    response.send(
      `Question and answer inserted into the database with quizId ${quizId}`
    )
  } catch (err) {
    console.log(err)
    response
      .status(500)
      .send('Something went wrong when writing to the database')
  }
}
