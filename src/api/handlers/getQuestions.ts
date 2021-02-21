import { Request, Response } from 'express'
import Joi from 'joi'
import { validateJoiSchema } from '../../utils'
import { GetQuestionsEndpointProps } from '../../../types'

const schema = Joi.object({
  quizId: Joi.number().required(),
})

export const getQuestions = async (
  request: Request<unknown, unknown, unknown, GetQuestionsEndpointProps>,
  response: Response
) => {
  const {
    value,
    error: validationError,
  } = validateJoiSchema<GetQuestionsEndpointProps>(schema, request.query)

  const db = request.db

  const { quizId } = value

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const allQuestions = await db.getAllQuestionsFromQuiz(value.quizId)
  const quizName = await db.getQuizName(quizId)
  response.json({ quizName, questions: allQuestions })
}
