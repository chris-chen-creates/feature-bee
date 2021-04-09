import FeatureDAO from './model';

export default class FeatureController {
  constructor(
    private dao: FeatureDAO,
  ) {}

  public async createFeature(feature: {
    name: string;
    active: boolean;
  }) {
    await this.dao.createFeature(feature);    
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
    return await this.dao.listFeatures();
  }
}
