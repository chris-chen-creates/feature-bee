import { LoginError } from '../users/controller'
import FeatureDAO, { Feature } from './model'

export default class FeatureController {
  constructor(private dao: FeatureDAO) {}

  public async createFeature(feature: Feature, token: string): Promise<number> {
    const userId = await this.dao.getUserIdFromSession(token)
    if (userId === undefined) {
      throw new LoginError('User not found')
    }
    const featureId = await this.dao.createFeature(feature, userId)
    return featureId
  }

  public async getFeature(id: number, token: string) {
    const userId = await this.dao.getUserIdFromSession(token)
    if (userId === undefined) {
      throw new LoginError('User not found')
    }
    return await this.dao.getFeature(id)
  }

  public async updateFeature(feature: Feature, token: string) {
    const userId = await this.dao.getUserIdFromSession(token)
    if (userId === undefined) {
      throw new LoginError('User not found')
    }
    await this.dao.updateFeature(feature)
  }

  public async deleteFeature(feature: Feature, token: string) {
    const userId = await this.dao.getUserIdFromSession(token)
    if (userId === undefined) {
      throw new LoginError('User not found')
    }
    await this.dao.deleteFeature(feature)
  }

  public async listFeatures(token: string) {
    const userId = await this.dao.getUserIdFromSession(token)
    if (userId === undefined) {
      throw new LoginError('User not found')
    }
    return await this.dao.listFeatures()
  }
}
