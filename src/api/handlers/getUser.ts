import { Request, Response } from 'express'
import Joi from 'joi'
import bcrypt from 'bcrypt'

import { GetUserEndpointProps } from '../../../types'
import { validateJoiSchema, generateAuthToken } from '../../utils'
import { head } from 'ramda'

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

export const getUser = async (
  request: Request<undefined, undefined, GetUserEndpointProps>,
  response: Response
) => {
  const {
    value,
    error: validationError,
  } = validateJoiSchema<GetUserEndpointProps>(schema, request.body)
  const dbClient = request.db

  if (validationError) {
    return response.status(500).send(String(validationError))
  }

  const { username, password } = value

  try {
    const updatedRows = await dbClient.getUser(username)
    const user = head(updatedRows.rows)

    if (!user) return response.status(404).send('No such user')

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    if (!passwordIsCorrect) return response.status(401).send('Wrong password')

    const authToken = generateAuthToken(user)

    return response.header('x-auth-token', authToken).status(200).send({
      userId: user.userId,
      username: user.username,
    })
  } catch (err) {
    return response
      .status(500)
      .send('Something went wrong when logging user in')
  }
}
