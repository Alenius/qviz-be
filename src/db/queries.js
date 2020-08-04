const { head, nth, split, filter, length, pipe, lte, sort } = require('ramda')
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
  const res = await pool.query(`SELECT answers from quiz WHERE id=${quizId}`)
  const allAnswers = head(res.rows).answers
  const rightAnswer = nth(questionId, allAnswers)
  return rightAnswer
}

const checkAnswerForQuestion = async ({ quizId, questionId, userAnswer }) => {
  const answers = await getSingleQuestion({ quizId, questionId })
  const possibleAnswers = split('/', answers)
  const fs = FuzzySet(possibleAnswers)
  const fuzzyMatch = fs.get(userAnswer)

  // accept answer if any has 0.6 or higher
  const isAnswerAcceptable = pipe(
    filter((it) => head(it) > 0.75),
    length,
    lte(1)
  )

  const getBestMatch = pipe(
    sort((a, b) => head(b) - head(a)),
    head
  )

  if (fuzzyMatch && isAnswerAcceptable(fuzzyMatch)) {
    const [rating, answer] = getBestMatch(fuzzyMatch)
    return {
      correctAnswer: answer,
      rating,
      userAnswerWasCorrect: true,
    }
  }
  const [rating, answer] = fuzzyMatch
    ? getBestMatch(fuzzyMatch)
    : [null, possibleAnswers[0]]
  return {
    correctAnswer: answer,
    rating,
    userAnswerWasCorrect: false,
  }
}

module.exports = {
  getQuestions,
  checkAnswerForQuestion,
}
