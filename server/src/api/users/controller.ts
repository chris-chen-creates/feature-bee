import UserDAO from './model'

interface Credentials {
  username: string
  password: string
}

export class LoginError extends Error {}

export default class UserController {
  constructor(private dao: UserDAO) {}

  public async register({ username, password }: Credentials): Promise<string> {
    const userId = await this.dao.createUser(username, password)
    return await this.dao.createSession(userId)
  }

  public async login(credentials: Credentials): Promise<string> {
    const userId = await this.dao.loginUser(
      credentials.username,
      credentials.password
    )
    if (userId === undefined) {
      throw new LoginError('User not found')
    }
    return await this.dao.createSession(userId)
  }
}
