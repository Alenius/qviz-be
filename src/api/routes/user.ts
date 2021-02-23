import { Router } from 'express'
import { createUser } from '../handlers'
import { getUser } from '../handlers/getUser'

export const connectUserRoutes = async (router: Router) => {
  router.post('/user', createUser)

  router.post('/login', getUser)
}
