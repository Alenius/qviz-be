import { Client } from 'pg'
import { insertUser } from '../src/db/queries/users/insertUser'

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

export interface User {
  id: string
  username: string
}

export interface QvizDB extends Client {
  insertUser: ReturnType<typeof insertUser>
}
