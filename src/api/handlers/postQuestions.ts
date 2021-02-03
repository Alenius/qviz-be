import { Request, Response } from 'express'
import Joi from 'joi'
import { forEach } from 'ramda'

import { insertQuestionAndAnswer } from '../../db/queries'
import { validateJoiSchema } from '../../utils'

const schema = Joi.object<{questions: PostQuestionsEndpointProps}>({
  questions: Joi.array()
    .items(
      Joi.object({
        questionText: Joi.string().required(),
        quizId: Joi.string().required(),
        acceptedAnswers: Joi.string().required(),
        extraInfo: Joi.string(),
      })
    )
    .required(),
})

export const postQuestions = async (request: Request<{}, PostQuestionsEndpointProps>, response: Response) => {
  const { value, error: validationError } = validateJoiSchema<PostQuestionsEndpointProps>(schema, request.body)

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { questions } = value

  try {
    forEach(async (question) => {
      const { questionText, quizId, acceptedAnswers, extraInfo = '' } = question
      await insertQuestionAndAnswer(
        quizId,
        questionText,
        acceptedAnswers,
        extraInfo
      )
    }, questions)
    response.send('Question and answer inserted into the database')
  } catch (err) {
    console.log(err)
    response
      .status(500)
      .send('Something went wrong when writing to the database')
  }
}
