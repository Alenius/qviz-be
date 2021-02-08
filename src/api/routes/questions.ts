import { Router } from 'express'
import { getQuestions } from '../handlers'

export const connectQuestionRoutes = async (router: Router) => {
  router.get('/questions', getQuestions)
}