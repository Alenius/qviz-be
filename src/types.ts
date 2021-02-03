interface GetAnswerEndpointProps {
  quizId: number
  questionId: number
  userAnswer: string
}

interface GetQuizEndpointProps {
  quizName?: string
  author?: number
  id?: string
}

interface GetQuestionsEndpointProps {
  quizId: number
}

interface DeleteQuizEndpointProps {
  quizId: number
}

interface PostQuestionsEndpointProps {
  questions: {
    questionText: string
    quizId: string
    acceptedAnswers: string
    extraInfo: string
  }[]
}

interface QuestionEntity {
  questionText: string
  acceptedAnswers: string
  extraInfo?: string
}

interface PostQuizEndpointProps {
  quizName: string
  author: string
  questionEntities: QuestionEntity[]
}