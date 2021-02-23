import { QvizDB, User } from '../../../types'

export const getUser = (db: QvizDB) => async (username: string) =>
  db.query<User>(`
    SELECT
      * 
    FROM
      users
    WHERE
      username = '${username}'
    `)
