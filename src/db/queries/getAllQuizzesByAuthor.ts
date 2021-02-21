import { toLower } from 'ramda'
import { QvizDB } from '../../../types'
import { enrichWithNoOfQuestions } from '../utils'

export const getAllQuizzesByAuthor = (db: QvizDB) => async (author: string) => {
  const res = await db.query(`
    SELECT * from quiz WHERE lower(author)='${toLower(author)}'`)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(db)(res.rows))
  return enrichedRes
}
