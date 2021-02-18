import { Request, Response } from 'express'
import Joi from 'joi'

import { CreateUserEndpointProps } from '../../../types'
import { validateJoiSchema } from '../../utils'

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

export const createUser = async (
  request: Request<{}, {}, CreateUserEndpointProps>,
  response: Response
) => {
  const {
    value,
    error: validationError,
  } = validateJoiSchema<CreateUserEndpointProps>(schema, request.body)
  const dbClient = request.db

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { username, password } = value

  try {
    await dbClient.insertUser(username, password)
    response.status(200).send(`User was inserted with username ${username}`)
  } catch (err) {
    if (err.code === '23505') {
      response.status(409).send('A user with that username already exists')
    }

    response.status(500).send('Something went wrong when inserting user')
  }

  return null
}
