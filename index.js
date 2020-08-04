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
  const questionId = request.query.id
  const allQuestions = await queries.getQuestions(questionId)
  response.json({ questions: allQuestions })
})

app.get('/answer', async (request, response) => {
  const { quizId, questionId, userAnswer } = request.query
  const {
    correctAnswer,
    rating,
    userAnswerWasCorrect,
  } = await queries.checkAnswerForQuestion({
    quizId,
    questionId,
    userAnswer,
  })
  response.json({ userAnswer, rating, correctAnswer, userAnswerWasCorrect })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
