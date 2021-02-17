import { QvizDB } from '../../../../types'

export const insertUser = (db: QvizDB) => async (
  username: string,
  password: string
) =>
  db.query(`
    INSERT INTO users (username, password)
    VALUES('${username}', '${password}')
    RETURNING username
    `)
