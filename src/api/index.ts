import { Router } from 'express'
import { connectQuestionRoutes } from './routes/questions'
import { connectAnswerRoutes } from './routes/answers'
import { connectQuizRoutes } from './routes/quiz'

export const connectRoutes = () => {
  const router = Router()

  connectQuestionRoutes(router)
  connectAnswerRoutes(router)
  connectQuizRoutes(router)

  router.get('/', (req, res) => {
    res.send('hello, welcome')
  })

  return router
}

