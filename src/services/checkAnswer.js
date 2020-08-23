const { head, split, filter, length, pipe, lte, sort } = require('ramda')
const FuzzySet = require('fuzzyset.js')
const { getSingleQuestionFromQuiz } = require('../db/queries')

const checkAnswer = async ({ quizId, questionId, userAnswer }) => {
  const answers = await getSingleQuestionFromQuiz({ quizId, questionId })
  const possibleAnswers = split('/', answers)
  const fs = FuzzySet(possibleAnswers)
  const fuzzyMatch = fs.get(userAnswer)

  // accept answer if any has 0.75 or higher
  const isAnswerAcceptable = pipe(
    filter((it) => head(it) > 0.75),
    length,
    lte(1)
  )

  const getBestMatch = pipe(
    sort((a, b) => head(b) - head(a)),
    head
  )

  if (fuzzyMatch && isAnswerAcceptable(fuzzyMatch)) {
    const [rating, answer] = getBestMatch(fuzzyMatch)
    return {
      correctAnswer: answer,
      rating,
      userAnswerWasCorrect: true,
    }
  }
  const [rating, answer] = fuzzyMatch
    ? getBestMatch(fuzzyMatch)
    : [null, possibleAnswers[0]]
  return {
    correctAnswer: answer,
    rating,
    userAnswerWasCorrect: false,
  }
}

module.exports = {
  checkAnswer,
}
