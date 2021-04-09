import { Connection } from 'mysql2';

export default class FeatureDAO {
  constructor(
    private db: Connection,
  ) {}

  public async createFeature({name, active}: {
    name: string;
    active: boolean;
  }) {
    await this.db.promise().query(
      `INSERT INTO Feature(name, active) VALUES (?, ?)`,
      [name, active],
    );
  }

  public async getFeature() {
    throw(new Error('not implemented'));
  }

  public async updateFeature() {
    throw(new Error('not implemented'));
  }

  public async deleteFeature() {
    throw(new Error('not implemented'));
  }

  public async listFeatures() {
    return (await this.db.promise().query(
      `SELECT id, name, active FROM Feature`,
    ))[0];
  }
}
