import { Request, Response, Router as ExpressRouter } from 'express'
import { Connection } from 'mysql2'

import toAsyncRouter from '../../middleware/asyncRouter'
import errorMiddleware from '../../middleware/errors'
import FeatureController from './controller'
import FeatureDAO from './model'
import { LoginError } from '../users/controller'

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
    try {
      let token = req.headers['auth'] as string
      const featureId = await this.controller.createFeature(req.body, token)
      res.json({ status: 'ok', featureId: featureId })
    } catch (e) {
      if (e instanceof LoginError) {
        res.status(403).json({ error: 'incorrect credentials' })
        return
      }
    }
  }

  public async getFeature(req: Request, res: Response) {
    try {
      let token = req.headers['auth'] as string
      const id = parseInt(req.params.id)
      if (id === null) {
        res.status(400).json({ error: 'id is needed for feature call' })
      }
      res.json(await this.controller.getFeature(id, token))
    } catch (e) {
      if (e instanceof LoginError) {
        res.status(403).json({ error: 'incorrect credentials' })
        return
      }
    }
  }

  private async updateFeature(req: Request, res: Response) {
    try {
      let token = req.headers['auth'] as string
      await this.controller.updateFeature(req.body, token)
      res.json({ status: 'ok' })
    } catch (e) {
      if (e instanceof LoginError) {
        res.status(403).json({ error: 'incorrect credentials' })
        return
      }
    }
  }

  private async deleteFeature(req: Request, res: Response) {
    try {
      let token = req.headers['auth'] as string
      await this.controller.deleteFeature(req.body, token)
      res.json({ status: 'ok' })
    } catch (e) {
      if (e instanceof LoginError) {
        res.status(403).json({ error: 'incorrect credentials' })
        return
      }
    }
  }

  private async listFeatures(req: Request, res: Response) {
    try {
      let token = req.headers['auth'] as string
      res.json(await this.controller.listFeatures(token))
    } catch (e) {
      if (e instanceof LoginError) {
        res.status(403).json({ error: 'incorrect credentials' })
        return
      }
    }
  }
}
