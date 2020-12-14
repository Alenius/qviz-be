const { checkAnswer } = require('../../services/checkAnswer')

const getAnswer = async (request, response) => {
  const { quizId, questionId, userAnswer } = request.query
  const {
    correctAnswer,
    rating,
    userAnswerWasCorrect,
    extraInfo,
  } = await checkAnswer({
    quizId,
    questionId,
    userAnswer,
  })
  response.json({
    userAnswer,
    rating,
    correctAnswer,
    userAnswerWasCorrect,
    extraInfo,
  })
}

module.exports = { getAnswer }
