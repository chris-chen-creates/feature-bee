import { Request, Response, Router as ExpressRouter } from 'express'
import { Connection } from 'mysql2'

import toAsyncRouter from '../../middleware/asyncRouter'
import UserController from './controller'
import UserDAO from './model'

export function createUserRouter(db: Connection): UserRouter {
  return new UserRouter(new UserController(new UserDAO(db)))
}

export class UserRouter {
  constructor(private controller: UserController) {}

  public routes(): ExpressRouter {
    const router = toAsyncRouter(ExpressRouter())
    router.post('/register', this.register.bind(this))
    return router
  }

  private async register(req: Request, res: Response) {
    const token = await this.controller.register(req.body)
    res.json({ token: token })
  }
}
