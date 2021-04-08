import { Request, Response, Router as ExpressRouter } from 'express';
import { Connection } from 'mysql';

import toAsyncRouter from '../middleware/asyncRouter'

export default class HealthRouter {
	constructor(
		private db: Connection,
	) {}

	public routes(): ExpressRouter {
		const router = toAsyncRouter(ExpressRouter());
		router.get('/alive', this.alive.bind(this));
		router.get('/health', this.health.bind(this));
		return router;
	}

	private async alive(_: Request, res: Response) {
		res.json({status: 'ok'});
	}

	private async health(_: Request, res: Response) {
		try {
      await this.db.query(`SELECT 1`);
			res.json({status: 'ok'});
		} catch (e) {
			console.log(e);
			res.status(500).json({status: 'not ok'});
		}
	}
}
