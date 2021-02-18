import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { User } from '../types'

export const validateJoiSchema = <T>(
  schema: Joi.ObjectSchema,
  stringToCheck: T
) => {
  const { value, error } = schema.validate(stringToCheck)
  const castValue = <T>value
  return { value: castValue, error }
}

export const generateAuthToken = (user: User) => {
  const privateKey = process.env.AUTH_PRIVATE_KEY
  const token = jwt.sign(
    { userId: user.id, username: user.username, isAdmin: false },
    privateKey!
  )
  return token
}
