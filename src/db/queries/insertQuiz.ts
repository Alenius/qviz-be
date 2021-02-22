import { forEach } from 'ramda'
import { QuestionEntity, QvizDB } from '../../../types'

interface RawQuiz {
  quiz_id: string
  name: string
  author_id: string
}

export const insertQuiz = (db: QvizDB) => async (
  quizName: string,
  userId: string,
  questionEntities: QuestionEntity[]
) => {
  const quizRes = await db.query<RawQuiz>(`
  INSERT INTO quiz (name, author_id)
      VALUES('${quizName}', '${userId}')
    RETURNING
      quiz_id
  `)

  const quizId = quizRes.rows[0].quiz_id

  forEach(async (entity) => {
    await db.query(
      `WITH question_insert AS (
      INSERT INTO questions (question_text,
          quiz_id)
          VALUES('${entity.questionText}',
            '${quizId}')
        RETURNING
          question_id
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
