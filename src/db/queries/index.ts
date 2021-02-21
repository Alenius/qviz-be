import { deleteQuiz } from './deleteQuiz'
import { getAllQuestionsFromQuiz } from './getAllQuestionsFromQuiz'
import { getAllQuizzes } from './getAllQuizzes'
import { getAllQuizzesByAuthor } from './getAllQuizzesByAuthor'
import { getAllQuizzesByQuizName } from './getAllQuizzesByQuizName'
import { getQuiz } from './getQuiz'
import { getQuizById } from './getQuizById'
import { getQuizName } from './getQuizName'
import { getNumberOfQuestionsForQuiz } from './getNumberOfQuestionsForQuiz'
import { getSingleQuestionFromQuiz } from './getSingleQuestionFromQuiz'
import { getSingleUser } from './getSingleUser'
import { insertQuiz } from './insertQuiz'
import { insertUser } from './insertUser'

// I am after the methods itself so this is 'uncurrying' it
interface DbMethods {
  deleteQuiz: ReturnType<typeof deleteQuiz>
  getAllQuestionsFromQuiz: ReturnType<typeof getAllQuestionsFromQuiz>
  getAllQuizzes: ReturnType<typeof getAllQuizzes>
  getAllQuizzesByAuthor: ReturnType<typeof getAllQuizzesByAuthor>
  getAllQuizzesByQuizName: ReturnType<typeof getAllQuizzesByQuizName>
  getQuiz: ReturnType<typeof getQuiz>
  getQuizById: ReturnType<typeof getQuizById>
  getQuizName: ReturnType<typeof getQuizName>
  getNumberOfQuestionsForQuiz: ReturnType<typeof getNumberOfQuestionsForQuiz>
  getSingleQuestionFromQuiz: ReturnType<typeof getSingleQuestionFromQuiz>
  getSingleUser: ReturnType<typeof getSingleUser>
  insertQuiz: ReturnType<typeof insertQuiz>
  insertUser: ReturnType<typeof insertUser>
}

const methods = {
  deleteQuiz,
  getAllQuestionsFromQuiz,
  getAllQuizzes,
  getAllQuizzesByAuthor,
  getAllQuizzesByQuizName,
  getQuiz,
  getQuizById,
  getQuizName,
  getNumberOfQuestionsForQuiz,
  getSingleQuestionFromQuiz,
  getSingleUser,
  insertQuiz,
  insertUser,
}

export { DbMethods, methods }
