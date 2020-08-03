require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000

const queries = require('./db/queries')
const { request } = require('express')

var corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/questions', async (request, response) => {
  console.log({ param: request.query.id })
  const questionId = request.query.id
  const allQuestions = await queries.getQuestions(questionId)
  console.log({ allQuestions: allQuestions[0].questions })
  response.json({ questions: allQuestions })
})

app.get('/answer', async (request, response) => {
  console.log({ param: request.query })
  const { quizId, questionId, userAnswer } = request.query
  const {
    correctAnswer,
    userAnswerWasCorrect,
  } = await queries.checkAnswerForQuestion({ quizId, questionId, userAnswer })
  response.json({ userAnswer, correctAnswer, userAnswerWasCorrect })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
