import { head } from 'ramda'
import { QvizDB, User } from '../../../types'

export const getSingleUser = (db: QvizDB) => async (username: string) => {
  const res = await db.query<User>(`
    SELECT * FROM users WHERE username=${username}
  `)

  return head(res.rows)
}
