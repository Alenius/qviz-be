import { getDbClient } from '../../utils'
import { head } from 'ramda'
import { User } from '../../../../types'

export const createUser = async (username: string, password: string) => {
  const dbClient = getDbClient()
  dbClient.connect()

  await dbClient.query(`
    INSERT INTO users (username, password)
    VALUES('${username}', '${password}')
    RETURNING
    id AS quiz_id
    `)
}
