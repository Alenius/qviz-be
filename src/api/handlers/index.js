const { getQuiz } = require('./getQuiz')
const { postQuiz } = require('./postQuiz')
const { deleteQuiz } = require('./deleteQuiz')
const { getQuestions } = require('./getQuestions')
const { postQuestions } = require('./postQuestions')
const { getAnswer } = require('./getAnswer')

module.exports = {
  getQuiz,
  postQuiz,
  deleteQuiz,
  getQuestions,
  postQuestions,
  getAnswer,
}
