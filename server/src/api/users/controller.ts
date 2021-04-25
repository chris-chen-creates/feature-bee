import UserDAO from './model'

interface Credentials {
  username: string
  password: string
}

export default class UserController {
  constructor(private dao: UserDAO) {}

  public async register({ username, password }: Credentials): Promise<string> {
    const userId = await this.dao.createUser(username, password)
    return await this.dao.createSession(userId)
  }

  public async login({ username, password }: Credentials): Promise<string> {
    await this.dao.loginUser(username, password)
    return ''
  }
}
