import { head, split, filter, length, pipe, lte, sort } from 'ramda'
import FuzzySet from 'fuzzyset'
import { getSingleQuestionFromQuiz } from '../db/queries'

type FuzzyMatch = [number, string]

const checkAnswer = async ({ quizId, questionId, userAnswer }: GetAnswerEndpointProps) => {
  const { acceptedAnswers, extraInfo } = await getSingleQuestionFromQuiz(
    questionId
  )

  const possibleAnswers = split('/', acceptedAnswers)
  const fs = FuzzySet(possibleAnswers)
  const fuzzyMatch: FuzzyMatch[] = fs.get(userAnswer)

  // accept answer if any has 0.75 or higher
  const isAnswerAcceptable = pipe<FuzzyMatch[], FuzzyMatch[], number, boolean>(
    filter((it: [number, string]) => head(it)! > 0.75),
    length,
    lte(1)
  )

  const getBestMatch = pipe<FuzzyMatch[], FuzzyMatch[], FuzzyMatch>(
    sort((a, b) => head<any>(b)! - head<any>(a)!), // FIXME: typings
    head
  )

  if (Boolean(fuzzyMatch) && isAnswerAcceptable(fuzzyMatch)) {
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
    extraInfo,
  }
}

export {
  checkAnswer,
}
