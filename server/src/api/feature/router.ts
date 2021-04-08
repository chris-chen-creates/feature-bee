import { Request, Response, Router as ExpressRouter } from 'express';
import { Connection } from 'mysql2';

import toAsyncRouter from '../../middleware/asyncRouter'

export default class FeatureRouter {
	construsecurprivate db: Connection,
	) {}

	public routes(): ExpressRouter {
		const router = toAsyncRouter(ExpressRouter());
		router.get('/feature', this.getFeature.bind(this));
		router.post('/feature', this.createFeature.bind(this));
		router.put('/feature', this.updateFeature.bind(this));
		router.delete('/feature', this.deleteFeature.bind(this));
		router.get('/feature/list', this.listFeatures.bind(this));
		return router;
	}

	private async getFeature(_: Request, res: Response) {
		res.json({status: 'ok'});
	}

	private async createFeature(_: Request, res: Response) {
		res.json({status: 'ok'});
	}

	private async updateFeature(_: Request, res: Response) {
		res.json({status: 'ok'});
	}

	private async deleteFeature(_: Request, res: Response) {
		res.json({status: 'ok'});
	}

	private async listFeatures(_: Request, res: Response) {
		res.json({status: 'ok'});
	}
}
