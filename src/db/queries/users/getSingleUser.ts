import { getDbClient } from '../../utils'
import { head } from 'ramda'
import { User } from '../../../../types'

export const getSingleUser = async (username: string) => {
  const dbClient = getDbClient()
  dbClient.connect()

  const res = await dbClient.query<User>(`
    SELECT * FROM users WHERE username=${username}
  `)

  return head(res.rows)
}
