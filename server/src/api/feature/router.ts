import { Request, Response, Router as ExpressRouter } from 'express'
import { Connection } from 'mysql2'

import toAsyncRouter from '../../middleware/asyncRouter'
import errorMiddleware from '../../middleware/errors'
import FeatureController from './controller'
import FeatureDAO from './model'

export function createFeatureRouter(db: Connection): FeatureRouter {
  return new FeatureRouter(new FeatureController(new FeatureDAO(db)))
}

export class FeatureRouter {
  constructor(private controller: FeatureController) {}

  public routes(): ExpressRouter {
    const router = toAsyncRouter(ExpressRouter())
    router.post('/feature', this.createFeature.bind(this))
    router.get('/feature/:id', this.getFeature.bind(this))
    router.put('/feature', this.updateFeature.bind(this))
    router.delete('/feature', this.deleteFeature.bind(this))
    router.get('/featurelist', this.listFeatures.bind(this))
    return router
  }

  private async createFeature(req: Request, res: Response) {
    const featureId = await this.controller.createFeature(req.body)
    req.headers['auth_token']
    console.log(`header auth token: ${req.headers['auth']}`)
    res.json({ status: 'ok', featureId: featureId })
  }

  private async getFeature(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    if (id === null) {
      res.status(400).json({ error: 'id is needed for feature call' })
    }
    res.json(await this.controller.getFeature(id))
  }

  private async updateFeature(req: Request, res: Response) {
    await this.controller.updateFeature(req.body)
    res.json({ status: 'ok' })
  }

  private async deleteFeature(req: Request, res: Response) {
    await this.controller.deleteFeature(req.body)
    res.json({ status: 'ok' })
  }

  private async listFeatures(_: Request, res: Response) {
    const features = await this.controller.listFeatures()
    res.json(await this.controller.listFeatures())
  }
}
