import { QvizDB, User } from '../../../types'

export const getUser = (db: QvizDB) => async (username: string) =>
  db.query<User>(`
    SELECT
     user_id AS "userId", username, password
    FROM
      users
    WHERE
      username = '${username}'
    `)
