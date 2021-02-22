import { Router } from 'express'
import { getQuiz, postQuiz, deleteQuiz } from '../handlers'
import { auth } from '../middlewares'

export const connectQuizRoutes = async (router: Router) => {
  router.get('/quiz', [auth], getQuiz)
  router.post('/quiz', [auth], postQuiz)
  router.delete('/quiz', [auth], deleteQuiz)
}
