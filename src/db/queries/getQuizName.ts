import { QvizDB } from '../../../types'

export const getQuizName = (db: QvizDB) => async (quizId: string) => {
  const res = await db.query(`
    SELECT name FROM quiz WHERE id=${quizId}
    `)

  const quizName = res.rows[0].name
  return quizName
}
