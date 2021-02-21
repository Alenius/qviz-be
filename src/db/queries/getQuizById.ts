import { QvizDB } from '../../../types'
import { enrichWithNoOfQuestions } from '../utils'

export const getQuizById = (db: QvizDB) => async (quizId: string) => {
  const res = await db.query(`
    SELECT * FROM quiz WHERE id=${quizId} 
  `)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(db)(res.rows))
  return enrichedRes
}
