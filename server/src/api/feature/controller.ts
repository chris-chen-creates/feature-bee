import FeatureDAO, { Feature } from './model'

export default class FeatureController {
  constructor(private dao: FeatureDAO) {}

  public async createFeature(feature: Feature, token: string): Promise<number> {
    const userId = await this.dao.getUserIdFromSession(token)
    console.log(`first userid: ${userId}`)
    const featureId = await this.dao.createFeature(feature, userId)
    return featureId
  }

  public async getFeature(id: number) {
    return await this.dao.getFeature(id)
  }

  public async updateFeature(feature: Feature) {
    await this.dao.updateFeature(feature)
  }

  public async deleteFeature(feature: Feature) {
    await this.dao.deleteFeature(feature)
  }

  public async listFeatures() {
    return await this.dao.listFeatures()
  }
}
