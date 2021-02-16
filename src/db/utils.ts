import { Client } from 'pg'

const localClient = new Client({
  user: process.env.DB_USER,
  host: 'localhost',
  password: process.env.DB_PASSWORD,
  database: 'qvis',
  port: 5432,
})

const herokuClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export const getDbClient = () => {
  const isRunningLocally = process.env.RUN_LOCALLY === 'true'
  const client = isRunningLocally ? localClient : herokuClient
  return client
}
