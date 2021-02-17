import { Router } from 'express'
import { connectQuestionRoutes } from './routes/questions'
import { connectAnswerRoutes } from './routes/answers'
import { connectQuizRoutes } from './routes/quiz'
import { connectUserRoutes } from './routes/user'

export const connectRoutes = () => {
  const router = Router()

  connectQuestionRoutes(router)
  connectAnswerRoutes(router)
  connectQuizRoutes(router)
  connectUserRoutes(router)

  router.get('/', (req, res) => {
    res.send('hello, welcome')
  })

  return router
}
