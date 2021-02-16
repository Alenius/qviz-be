import { Router } from 'express'
import { createUser } from '../handlers'

export const createUserRoute = async (router: Router) => {
  router.post('/user', createUser)
}
