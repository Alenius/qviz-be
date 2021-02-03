import { Router } from 'express'
import { getAnswer } from '../handlers'

export const connectAnswerRoutes = (router: Router) => {
  router.get('/answer', getAnswer)
}