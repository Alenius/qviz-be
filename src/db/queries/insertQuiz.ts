import { forEach } from 'ramda'
import { QuestionEntity, QvizDB } from '../../../types'

export const insertQuiz = (db: QvizDB) => async (
  quizName: string,
  author: string,
  questionEntities: QuestionEntity[]
) => {
  const quizRes = await db.query(`
  INSERT INTO quiz (name, author)
      VALUES('${quizName}', '${author}')
    RETURNING
      id AS quiz_id
  `)

  const quizId = quizRes.rows[0].quiz_id

  forEach(async (entity) => {
    await db.query(
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
