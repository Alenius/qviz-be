import { Client } from 'pg'
import { QvizDB } from '../types'
import { methods } from './db/queries'

const localClient = new Client({
  user: process.env.DB_USER,
  host: 'localhost',
  password: process.env.DB_PASSWORD,
  database: 'qvis',
  port: 5432,
})

const herokuClient = new Client({
  connectionString: process.env.DATABASE_URL,
})

export const getDbClient = () => {
  const isRunningLocally = process.env.RUN_LOCALLY === 'true'
  const client = isRunningLocally ? localClient : herokuClient
  return client
}

const bindDbMethods = (client: Client): QvizDB => {
  const qvizDb = client as QvizDB

  qvizDb.deleteQuiz = methods.deleteQuiz(qvizDb)
  qvizDb.getAllQuestionsFromQuiz = methods.getAllQuestionsFromQuiz(qvizDb)
  qvizDb.getAllQuizzes = methods.getAllQuizzes(qvizDb)
  qvizDb.getAllQuizzesByAuthor = methods.getAllQuizzesByAuthor(qvizDb)
  qvizDb.getAllQuizzesByQuizName = methods.getAllQuizzesByQuizName(qvizDb)
  qvizDb.getQuiz = methods.getQuiz(qvizDb)
  qvizDb.getQuizById = methods.getQuizById(qvizDb)
  qvizDb.getQuizName = methods.getQuizName(qvizDb)
  qvizDb.getNumberOfQuestionsForQuiz = methods.getNumberOfQuestionsForQuiz(
    qvizDb
  )
  qvizDb.getSingleQuestionFromQuiz = methods.getSingleQuestionFromQuiz(qvizDb)
  qvizDb.getSingleUser = methods.getSingleUser(qvizDb)
  qvizDb.insertQuiz = methods.insertQuiz(qvizDb)
  qvizDb.insertUser = methods.insertUser(qvizDb)

  return qvizDb
}

export const setup = () => {
  const client = getDbClient()
  const qvizClient = bindDbMethods(client)
  qvizClient.connect()

  return { db: qvizClient }
}
