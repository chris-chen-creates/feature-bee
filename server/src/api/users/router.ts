import { Request, Response, Router as ExpressRouter } from 'express'
import { Connection } from 'mysql2'

import toAsyncRouter from '../../middleware/asyncRouter'
import UserController from './controller'
import UserDAO from './model'
import { LoginError } from './controller'

export function createUserRouter(db: Connection): UserRouter {
  return new UserRouter(new UserController(new UserDAO(db)))
}

export class UserRouter {
  constructor(private controller: UserController) {}

  public routes(): ExpressRouter {
    const router = toAsyncRouter(ExpressRouter())
    router.post('/register', this.register.bind(this))
    router.post('/login', this.login.bind(this))
    return router
  }

  private async register(req: Request, res: Response) {
    const token = await this.controller.register(req.body)
    res.json({ token: token })
  }

  private async login(req: Request, res: Response) {
    try {
      const token = await this.controller.login(req.body)
      res.json({ token: token })
    } catch (e) {
      if (e instanceof LoginError) {
        res.status(403).json({ error: 'incorrect credentials' })
        return
      }
      throw e
    }
  }
}
