import { toLower } from 'ramda'
import { QvizDB } from '../../../types'
import { enrichWithNoOfQuestions } from '../utils'

export const getAllQuizzesByQuizName = (db: QvizDB) => async (
  quizName: string
) => {
  const res = await db.query(`
  SELECT * from quiz WHERE lower(name)='${toLower(quizName)}'`)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(db)(res.rows))
  return enrichedRes
}
