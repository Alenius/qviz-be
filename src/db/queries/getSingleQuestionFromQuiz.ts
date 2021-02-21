import { head } from 'ramda'
import { QvizDB } from '../../../types'

export const getSingleQuestionFromQuiz = (db: QvizDB) => async (
  questionId: number
) => {
  const res = await db.query(
    `SELECT * from answers WHERE question_id=${questionId}`
  )
  const { accepted_answers: acceptedAnswers, extra_info: extraInfo } = head(
    res.rows
  )
  return { acceptedAnswers, extraInfo }
}
