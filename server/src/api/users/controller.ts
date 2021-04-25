import UserDAO from './model'

interface Credentials {
  username: string
  password: string
}

export default class UserController {
  constructor(private dao: UserDAO) {} //    private dao: FeatureDAO,

  public async register({ username, password }: Credentials): Promise<string> {
    const userId = await this.dao.createUser(username, password)
    return await this.dao.createSession(userId)
  }
}
