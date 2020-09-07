const { head, nth, toLower, forEach } = require('ramda')
const { query } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'qvis',
  password: process.env.DB_PASSWORD,
  port: 5432,
})

const getAllQuestionsFromQuiz = async (quizId) => {
  const res = await pool.query(
    `SELECT * from quiz WHERE id=${quizId} ORDER BY id ASC`
  )
  return res.rows
}

const getSingleQuestionFromQuiz = async ({ quizId, questionId }) => {
  const res = await pool.query(`SELECT answers from quiz WHERE id=${quizId}`)
  const allAnswers = head(res.rows).answers
  const correctAnswers = nth(questionId, allAnswers)
  return correctAnswers
}

const createQuiz = async (quizName, author, questionEntities) => {
  const quizRes = await pool.query(`
  INSERT INTO quiz (name, author)
      VALUES('${quizName}', '${author}')
    RETURNING
      id AS quiz_id
  `)

  const quizId = quizRes.rows[0].quiz_id

  forEach(async (entity) => {
    await pool.query(
      `WITH question_insert AS (
      INSERT INTO questions (question_text,
          quiz_id)
          VALUES('${entity.questionText}',
            ${parseInt(quizId)})
        RETURNING
          id AS question_id
      ) INSERT INTO answers (accepted_answers, extra_info, question_id)
      SELECT
        '${entity.acceptedAnswers}',
        '${entity.extraInfo}',
        question_id
      FROM
        question_insert
    `
    )
  }, questionEntities)

  return { quizId }
}

const getQuiz = async (quizName, author) => {
  const res = await pool.query(`
  SELECT * from quiz WHERE lower(name)='${toLower(
    quizName
  )}' AND lower(author)='${toLower(author)}'`)

  return { ...res.rows[0] }
}

const getAllQuizzesByAuthor = async (author) => {
  const res = await pool.query(`
  SELECT * from quiz WHERE lower(author)='${toLower(author)}'`)
  return res.rows
}

const getAllQuizzesByQuizName = async (quizName) => {
  const res = await pool.query(`
  SELECT * from quiz WHERE lower(name)='${toLower(quizName)}'`)
  return res.rows
}

module.exports = {
  getAllQuestionsFromQuiz,
  getSingleQuestionFromQuiz,
  createQuiz,
  getQuiz,
  getAllQuizzesByAuthor,
  getAllQuizzesByQuizName,
}
