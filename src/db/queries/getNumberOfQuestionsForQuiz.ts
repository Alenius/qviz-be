import { QvizDB } from '../../../types'

export const getNumberOfQuestionsForQuiz = (db: QvizDB) => async (
  quizId: string
) => {
  const res = await db.query(`
  SELECT * from questions
  WHERE quiz_id=${quizId}`)
  return res.rows.length
}
