import { Request, Response } from 'express'
import Joi from 'joi'
import bcrypt from 'bcrypt'

import { CreateUserEndpointProps } from '../../../types'
import { validateJoiSchema, generateAuthToken } from '../../utils'
import { head } from 'ramda'

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
    const encryptedPassword = await bcrypt.hash(password, 10)

    const updatedRows = await dbClient.insertUser(username, encryptedPassword)
    const user = head(updatedRows.rows)

    if (!user) throw Error('Something went horribly wrong when inserting user')

    const authToken = generateAuthToken(user)
    console.log({ user })

    response
      .header('x-auth-token', authToken)
      .status(200)
      .send(
        `User was inserted with username ${user.username} and id ${user.id}`
      )
  } catch (err) {
    if (err.code === '23505') {
      response.status(409).send('A user with that username already exists')
    }

    response.status(500).send('Something went wrong when inserting user')
  }

  return null
}
