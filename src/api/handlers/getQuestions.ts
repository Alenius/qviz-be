import { Request, Response } from 'express'
import Joi from 'joi'
import { getAllQuestions } from '../../services/getAllQuestionsFromQuiz'
import { getQuizName } from '../../db/queries'
import { validateJoiSchema } from '../../utils'
import { GetQuestionsEndpointProps } from '../../../types'

const schema = Joi.object({
  quizId: Joi.number().required(),
})

export const getQuestions = async (
  request: Request<{}, {}, {}, GetQuestionsEndpointProps>,
  response: Response
) => {
  const {
    value,
    error: validationError,
  } = validateJoiSchema<GetQuestionsEndpointProps>(schema, request.query)

  const { quizId } = value

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const allQuestions = await getAllQuestions(value.quizId)
  const quizName = await getQuizName(quizId)
  response.json({ quizName, questions: allQuestions })
}
