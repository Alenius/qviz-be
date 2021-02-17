import { Router } from 'express'
import { createUser } from '../handlers'

export const connectUserRoutes = async (router: Router) => {
  router.post('/user', createUser)
}
