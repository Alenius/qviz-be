import { Request, Response } from 'express'
import Joi from 'joi'
import { DeleteQuizEndpointProps } from '../../../types'
import { validateJoiSchema } from '../../utils'

const schema = Joi.object({
  quizId: Joi.number().required(),
})

export const deleteQuiz = async (request: Request, response: Response) => {
  const {
    value,
    error: validationError,
  } = validateJoiSchema<DeleteQuizEndpointProps>(schema, request.body)

  const db = request.db

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { quizId } = value

  try {
    const exists = (await db.getQuizById(quizId)).length !== 0
    if (!exists) {
      response.status(404).send('No quiz with that id found')
    }
    await db.deleteQuiz(quizId)
    response.status(200).send({ quizId })
  } catch (err) {
    console.log(err)
    response.status(500).send('Something went wrong when deleting the quiz')
  }
}
