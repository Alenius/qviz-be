import { Request, Response } from 'express'
import { checkAnswer } from '../../services/checkAnswer'
import { GetAnswerEndpointProps } from '../../../types'

export const getAnswer = async (
  request: Request<{}, {}, {}, GetAnswerEndpointProps>,
  response: Response
) => {
  const {
    quizId,
    questionId,
    userAnswer,
  }: GetAnswerEndpointProps = request.query
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
