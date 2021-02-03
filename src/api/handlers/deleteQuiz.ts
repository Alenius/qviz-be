import { Request, Response} from 'express'
import Joi from 'joi'
import { deleteQuiz as deleteQuizQuery, getQuizById } from '../../db/queries'
import { validateJoiSchema } from '../../utils'


const schema = Joi.object({
  quizId: Joi.number().required(),
})

export const deleteQuiz = async (request: Request, response: Response) => {
  const { value, error: validationError } = validateJoiSchema<DeleteQuizEndpointProps>(schema, request.body)

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { quizId } = value

  try {
    const exists = (await getQuizById(quizId)).length !== 0
    if (!exists) {
      response.status(404).send('No quiz with that id found')
    }
    await deleteQuizQuery(quizId)
    response.status(200).send({ quizId })
  } catch (err) {
    console.log(err)
    response.status(500).send('Something went wrong when deleting the quiz')
  }
}
