import { Router } from 'express'
import { getQuestions, postQuestions } from '../handlers'

export const connectQuestionRoutes = async (router: Router) => {
  router.get('/questions', getQuestions)
  router.post('/questions', postQuestions)
}