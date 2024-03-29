import { Client } from 'pg'
import { DbMethods } from '../src/db/queries'

export interface GetAnswerEndpointProps {
  quizId: number
  questionId: number
  userAnswer: string
}

export interface GetQuizEndpointProps {
  quizName?: string
  author?: string
  id?: string
}

export interface GetQuestionsEndpointProps {
  quizId: string
}

export interface DeleteQuizEndpointProps {
  quizId: string
}

export interface PostQuestionsEndpointProps {
  questions: {
    questionText: string
    quizId: string
    acceptedAnswers: string
    extraInfo: string
  }[]
}

export interface QuestionEntity {
  id: string
  questionText: string
  acceptedAnswers: string
  extraInfo?: string
}

export interface PostQuizEndpointProps {
  quizName: string
  author: string
  questionEntities: QuestionEntity[]
}

export interface CreateUserEndpointProps {
  username: string
  password: string
}

export type GetUserEndpointProps = CreateUserEndpointProps

export interface User {
  userId: string
  firstName: string
  lastName: string
  username: string
  password: string
}

export type QvizDB = Client & DbMethods
