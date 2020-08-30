const { head, nth } = require('ramda')

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

const insertQuestionAndAnswer = async (
  quizId,
  questionText,
  acceptedAnswers,
  extraInfo
) => {
  const res = await pool.query(
    `WITH question_insert AS (
      INSERT INTO questions (question_text,
          quiz_id)
          VALUES('${questionText}',
            ${parseInt(quizId)})
        RETURNING
          id AS question_id
      ) INSERT INTO answers (accepted_answers, extra_info, question_id)
      SELECT
        '${acceptedAnswers}',
        '${extraInfo}',
        question_id
      FROM
        question_insert
      RETURNING
        *;
    `
  )
  console.log({ res: res.rows[0] })
  return { ...res.rows[0] }
}

module.exports = {
  getAllQuestionsFromQuiz,
  getSingleQuestionFromQuiz,
  insertQuestionAndAnswer,
}
