import { QvizDB } from '../../../types'
import { enrichWithNoOfQuestions } from '../utils'

export const getAllQuizzes = (db: QvizDB) => async () => {
  const res = await db.query(`
    SELECT * from quiz 
  `)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(db)(res.rows))
  return enrichedRes
}
