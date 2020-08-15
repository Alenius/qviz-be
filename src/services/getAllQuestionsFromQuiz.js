const { getAllQuestionsFromQuiz } = require('../db/queries')

const getAllQuestions = async (quizId) => {
  const allQuestions = await getAllQuestionsFromQuiz(quizId)
  return allQuestions
}

module.exports = { getAllQuestions }
