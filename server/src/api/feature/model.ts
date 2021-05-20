import { Connection } from 'mysql2'

import { toObj, lastInsertId } from '../../utils/db'
import { LoginError } from '../users/controller'

export interface Feature {
  id?: number
  name?: string
  active?: boolean
  userId?: number
}

export default class FeatureDAO {
  constructor(private db: Connection) {}

  public async createFeature(
    { name, active }: Feature,
    userId: number
  ): Promise<number> {
    console.log(`userId: ${userId}`)
    await this.db.execute(
      `INSERT INTO Feature(name, active, created_by) VALUES (?, ?, ?)`,
      [name, active, userId]
    )
    return await lastInsertId(this.db)
  }

  public async getFeature(id: number) {
    const features = (
      await this.db
        .promise()
        .query(
          `SELECT id, name, active, created_by, deleted_at FROM Feature WHERE id = ?`,
          [id]
        )
    )[0]
    return toObj(features)[0]
  }

  public async updateFeature(feature: Feature) {
    await this.db.execute('UPDATE Feature SET active = ? WHERE id = ?', [
      feature.active,
      feature.id,
    ])
  }

  public async deleteFeature(feature: Feature) {
    await this.db.execute(
      'UPDATE Feature SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?',
      [feature.id]
    )
  }

  public async listFeatures() {
    const features = (
      await this.db
        .promise()
        .query(
          `SELECT id, name, active, created_by FROM Feature WHERE deleted_at IS NULL`
        )
    )[0]
    return toObj(features)
  }

  // function in progress
  public async getUserIdFromSession(token: string): Promise<number> {
    let userId = await this.db
      .promise()
      .query('SELECT id FROM Sessions WHERE session_token = ?', [token])
    // throw error rather than return undefined
    let userMatch = toObj(userId)[0][0].id
    console.log(userMatch)
    // if (userMatch === undefined) {
    //   throw new LoginError('User does not have access')
    // }
    return 0
  }
  // why will the usermatch variable not return anything other than undefined
}
