import { Router } from 'express'
import { getQuestions } from '../handlers'
import { auth } from '../middlewares'

export const connectQuestionRoutes = async (router: Router) => {
  router.get('/questions', [auth], getQuestions)
}
