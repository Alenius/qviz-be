import { head, toLower, forEach, map } from 'ramda'
import { Client } from 'pg'
import { QuestionEntity } from '../types'

const localClient = new Client({
  user: process.env.DB_USER,
  host: 'localhost',
  password: process.env.DB_PASSWORD,
  database: 'qvis',
  port: 5432,
  ssl: true
})

const herokuClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

const getClient = () => {
  const isRunningLocally = process.env.RUN_LOCALLY === 'true'
  const client = isRunningLocally ? localClient : herokuClient
  return client
}

const client = getClient()
client.connect()
console.log({ client })

const getAllQuestionsFromQuiz = async (quizId: string) => {
  const res = await client.query(
    `SELECT * from questions WHERE quiz_id=${quizId} `
  )
  return res.rows
}

const getSingleQuestionFromQuiz = async ( questionId: number) => {
  const res = await client.query(
    `SELECT * from answers WHERE question_id=${questionId}`
  )
  const { accepted_answers: acceptedAnswers, extra_info: extraInfo } = head(
    res.rows
  )
  return { acceptedAnswers, extraInfo }
}

const createQuiz = async (quizName: string, author: string, questionEntities: QuestionEntity[] ) => {
  const quizRes = await client.query(`
  INSERT INTO quiz (name, author)
      VALUES('${quizName}', '${author}')
    RETURNING
      id AS quiz_id
  `)

  const quizId = quizRes.rows[0].quiz_id

  forEach(async (entity) => {
    await client.query(
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

const getNumberOfQuestionsForQuiz = async (quizId: number) => {
  const res = await client.query(`
  SELECT * from questions
  WHERE quiz_id=${quizId}`)
  return res.rows.length
}

const enrichWithNoOfQuestions = map(async (it: any) => {
  const numberOfQuestions = await getNumberOfQuestionsForQuiz(it.id)
  return { ...it, numberOfQuestions }
})

const getAllQuizzes = async () => {
  const res = await client.query(`
    SELECT * from quiz 
  `)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(res.rows))
  return enrichedRes
}

const getQuizById = async (quizId: string) => {
  const res = await client.query(`
    SELECT * FROM quiz WHERE id=${quizId} 
  `)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(res.rows))
  return enrichedRes
}

const getQuiz = async (quizName: string, author: string) => {
  const res = await client.query(`
  SELECT * from quiz WHERE lower(name)='${toLower(
    quizName
  )}' AND lower(author)='${toLower(author)}'`)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(res.rows))

  return enrichedRes
}

const getQuizName = async (quizId: string) => {
  const res = await client.query(`
    SELECT name FROM quiz WHERE id=${quizId}
    `)

  const quizName = res.rows[0].name
  return quizName
}

const getAllQuizzesByAuthor = async (author: string) => {
  const res = await client.query(`
    SELECT * from quiz WHERE lower(author)='${toLower(author)}'`)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(res.rows))
  return enrichedRes
}

const getAllQuizzesByQuizName = async (quizName: string) => {
  const res = await client.query(`
  SELECT * from quiz WHERE lower(name)='${toLower(quizName)}'`)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(res.rows))
  return enrichedRes
}

const deleteQuiz = async (quizId: string) => {
  await client.query(`
  DELETE FROM quiz WHERE id=${quizId}`)
  return quizId
}

export {
  getAllQuestionsFromQuiz,
  getSingleQuestionFromQuiz,
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuiz,
  getAllQuizzesByAuthor,
  getAllQuizzesByQuizName,
  getQuizName,
  deleteQuiz,
}
