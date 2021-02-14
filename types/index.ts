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
  questionText: string
  acceptedAnswers: string
  extraInfo?: string
}

export interface PostQuizEndpointProps {
  quizName: string
  author: string
  questionEntities: QuestionEntity[]
}
