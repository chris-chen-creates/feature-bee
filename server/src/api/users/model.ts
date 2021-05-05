import { request } from 'express'
import { Connection } from 'mysql2'

import { toObj, lastInsertId } from '../../utils/db'

export default class UserDAO {
  constructor(private db: Connection) {}

  public async createUser(username: string, password: string): Promise<number> {
    let md5 = require('md5')
    let hash = md5(password)
    const user = (await this.db.execute(
      `INSERT INTO Users(username, password_hash) VALUES (?, ?)`,
      [username, hash]
    )) as any
    return await lastInsertId(this.db)
  }

  public async createSession(userId: number): Promise<string> {
    const session = await this.db.execute(
      `INSERT INTO Sessions(user_id, session_token) VALUES (?, UUID())`,
      [userId]
    )
    const sessionId = await lastInsertId(this.db)
    const result = await this.db
      .promise()
      .query('SELECT session_token FROM Sessions WHERE id = ?', [sessionId])
    const rows = toObj(((result as unknown) as any)[0]) as any
    return rows[0].session_token
  }

  public async loginUser(
    username: string,
    password: string
  ): Promise<number | undefined> {
    let md5 = require('md5')
    let hash = md5(password)
    let verifyUser = (
      await this.db
        .promise()
        .query(
          `SELECT id, username, password_hash FROM Users WHERE username = ? AND password_hash = ?`,
          [username, hash]
        )
    )[0]
    let checkUser = toObj(verifyUser)
    if (checkUser.length === 0) {
      return undefined
    }
    return checkUser[0].id
  }
}
