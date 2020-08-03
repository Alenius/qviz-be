const { head, nth, split, filter, length, gte, pipe, lte } = require('ramda')
const { request } = require('express')
const FuzzySet = require('fuzzyset.js')

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'qvis',
  password: process.env.DB_PASSWORD,
  port: 5432,
})

const getQuestions = async (quizId) => {
  const res = await pool.query(
    `SELECT * from quiz WHERE id=${quizId} ORDER BY id ASC`
  )
  return res.rows
}

const getSingleQuestion = async ({ quizId, questionId }) => {
  console.log({ quizId, questionId })
  const res = await pool.query(`SELECT answers from quiz WHERE id=${quizId}`)
  console.log({ rows: res.rows[0].answers })
  const allAnswers = head(res.rows).answers
  console.log({ allAnswers })
  const rightAnswer = nth(questionId, allAnswers)
  return rightAnswer
}

const checkAnswerForQuestion = async ({ quizId, questionId, userAnswer }) => {
  const answers = await getSingleQuestion({ quizId, questionId })
  const possibleAnswers = split('/', answers)
  const fs = FuzzySet(possibleAnswers)
  const fuzzyMatch = fs.get(userAnswer)
  // accept answer if any has 0.6 or higher
  const acceptable = pipe(
    filter((it) => head(it) > 0.6),
    length,
    lte(1)
  )
  console.log({ fuzzyMatch }) // keep this for monitoring answer grades
  return {
    correctAnswer: possibleAnswers[0],
    userAnswerWasCorrect: acceptable(fuzzyMatch),
  }
}

module.exports = {
  getQuestions,
  checkAnswerForQuestion,
}
