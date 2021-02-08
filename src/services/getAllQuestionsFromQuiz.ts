import { getAllQuestionsFromQuiz } from '../db/queries'

export const getAllQuestions = async (quizId: string) => {
  const allQuestions = await getAllQuestionsFromQuiz(quizId)
  return allQuestions
}
