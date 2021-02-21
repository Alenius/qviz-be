import { toLower } from 'ramda'
import { QvizDB } from '../../../types'
import { enrichWithNoOfQuestions } from '../utils'

export const getQuiz = (db: QvizDB) => async (
  quizName: string,
  author: string
) => {
  const res = await db.query(`
  SELECT * from quiz WHERE lower(name)='${toLower(
    quizName
  )}' AND lower(author)='${toLower(author)}'`)
  const enrichedRes = await Promise.all(enrichWithNoOfQuestions(db)(res.rows))

  return enrichedRes
}
