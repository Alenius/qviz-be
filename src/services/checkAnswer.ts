import { head, split, filter, length, pipe, lte, sort } from 'ramda'
import FuzzySet from 'fuzzyset.js'
import { GetAnswerEndpointProps, QvizDB } from '../../types'

type FuzzyMatch = [number, string]

const checkAnswer = (db: QvizDB) => async ({
  questionId,
  userAnswer,
}: GetAnswerEndpointProps) => {
  const { acceptedAnswers, extraInfo } = await db.getSingleQuestionFromQuiz(
    questionId
  )

  const possibleAnswers = split('/', acceptedAnswers)
  const fs = FuzzySet(possibleAnswers)
  const fuzzyMatch: FuzzyMatch[] | null = fs.get(userAnswer)

  if (!fuzzyMatch)
    throw new Error('Something went wrong with the fuzzy matching')

  // accept answer if any has 0.75 or higher
  const isAnswerAcceptable = pipe<FuzzyMatch[], FuzzyMatch[], number, boolean>(
    filter((it: [number, string]) => head(it)! > 0.75),
    length,
    lte(1)
  )

  const getBestMatch = pipe<FuzzyMatch[], FuzzyMatch[], FuzzyMatch>(
    // eslint-disable-next-line
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

export { checkAnswer }
