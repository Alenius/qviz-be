import { QvizDB } from '../../../types'

export const deleteQuiz = (db: QvizDB) => async (quizId: string) => {
  await db.query(`
  DELETE FROM quiz WHERE id=${quizId}`)
  return quizId
}
