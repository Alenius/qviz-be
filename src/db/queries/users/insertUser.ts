import { QvizDB, User } from '../../../../types'

export const insertUser = (db: QvizDB) => async (
  username: string,
  password: string
) =>
  db.query<User>(`
    INSERT INTO users (username, password)
    VALUES('${username}', '${password}')
    RETURNING id, username
    `)
