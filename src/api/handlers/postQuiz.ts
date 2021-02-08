import { Request, Response } from "express"
import { validateJoiSchema } from "../../utils"
import { PostQuizEndpointProps } from '../../types'

const Joi = require('joi')
const { createQuiz } = require('../../db/queries')

const schema = Joi.object({
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
})

export const postQuiz = async (request: Request, response: Response) => {
  const { value, error: validationError } = validateJoiSchema<PostQuizEndpointProps>(schema, request.body)

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
}
