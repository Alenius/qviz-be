import Joi from "joi"

export const validateJoiSchema = <T>(schema: Joi.ObjectSchema, stringToCheck: T) => {
  const { value, error } = schema.validate(stringToCheck) 
  const castValue  = <T> value
  return {value: castValue , error}
}