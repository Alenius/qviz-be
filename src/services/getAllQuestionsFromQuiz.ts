import { getAllQuestionsFromQuiz } from '../db/queries'

export const getAllQuestions = async (quizId: number) => {
  const allQuestions = await getAllQuestionsFromQuiz(quizId)
  return allQuestions
}
