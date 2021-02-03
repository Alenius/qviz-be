import { Router } from 'express'
import { getQuestions, postQuestions } from '../handlers'

const connectQuestionRoutes = async (router: Router) => {
  router.get('/questions', getQuestions)
  router.post('/questions', postQuestions)
}

module.exports = { connectQuestionRoutes }
