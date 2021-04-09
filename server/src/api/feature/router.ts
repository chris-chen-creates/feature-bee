import { Request, Response, Router as ExpressRouter } from 'express';
import { Connection } from 'mysql2';

import toAsyncRouter from '../../middleware/asyncRouter'
import FeatureController from './controller';
import FeatureDAO from './model';

export function createFeatureRouter(db: Connection): FeatureRouter {
  return new FeatureRouter(
    new FeatureController(
      new FeatureDAO(db),
    ),
  );
}

export class FeatureRouter {
  constructor(
    private controller: FeatureController,
  ) {}

	public routes(): ExpressRouter {
		const router = toAsyncRouter(ExpressRouter());
		router.post('/feature', this.createFeature.bind(this));
		router.get('/feature', this.getFeature.bind(this));
		router.put('/feature', this.updateFeature.bind(this));
		router.delete('/feature', this.deleteFeature.bind(this));
		router.get('/feature/list', this.listFeatures.bind(this));
		return router;
	}

	private async createFeature(req: Request, res: Response) {
    await this.controller.createFeature(req.body);
		res.json({status: 'ok'});
	}

	private async getFeature(_: Request, res: Response) {
		res.status(500).json({status: 'not implemented'});
	}

	private async updateFeature(_: Request, res: Response) {
		res.status(500).json({status: 'not implemented'});
	}

	private async deleteFeature(_: Request, res: Response) {
		res.status(500).json({status: 'not implemented'});
	}

	private async listFeatures(_: Request, res: Response) {
    const features = await this.controller.listFeatures();
		res.json(await this.controller.listFeatures());
	}
}
