import { Router } from 'express'
import { getQuiz, postQuiz, deleteQuiz } from '../handlers'

export const connectQuizRoutes = async (router: Router) => {
  router.get('/quiz', getQuiz)
  router.post('/quiz', postQuiz)
  router.delete('/quiz', deleteQuiz)
}

