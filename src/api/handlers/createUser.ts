import { Request, Response } from 'express'
import Joi from 'joi'
import { length } from 'ramda'

import { CreateUserEndpointProps } from '../../../types'
import { getSingleUser } from '../../db/queries/users/getSingleUser'
import { validateJoiSchema } from '../../utils'
import { createUser as createUserQuery } from '../../db/queries/users/createUser'

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

export const createUser = async (
  request: Request<{}, {}, {}, CreateUserEndpointProps>,
  response: Response
) => {
  const {
    value,
    error: validationError,
  } = validateJoiSchema<CreateUserEndpointProps>(schema, request.query)

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { username, password } = value

  const userAlreadyExists = Boolean(await getSingleUser(username))

  if (userAlreadyExists) {
    return response.status(409).send('User with that username already exists')
  }

  return null
}
