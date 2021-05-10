import { Connection } from 'mysql2'

import { toObj, lastInsertId } from '../../utils/db'

export interface Feature {
  id?: number
  name?: string
  active?: boolean
}

export default class FeatureDAO {
  constructor(private db: Connection) {}

  public async createFeature({ name, active }: Feature): Promise<number> {
    await this.db.execute(`INSERT INTO Feature(name, active) VALUES (?, ?)`, [
      name,
      active,
    ])
    return await lastInsertId(this.db)
  }

  public async getFeature(id: number) {
    const features = (
      await this.db
        .promise()
        .query(
          `SELECT id, name, active, deleted_at FROM Feature WHERE id = ?`,
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
        .query(`SELECT id, name, active FROM Feature WHERE deleted_at IS NULL`)
    )[0]
    return toObj(features)
  }
}
