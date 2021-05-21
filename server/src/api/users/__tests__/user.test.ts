import { response } from 'express'
import mysql from 'mysql2'

import Config from '../../../config'
import UserController, { LoginError } from '../controller'
import UserDAO from '../model'

const config = Config.readFromEnvironment()
const db = mysql.createConnection(config.dbOptions())
const controller = new UserController(new UserDAO(db))

test('register creates users properly', async () => {
  const token = await controller.register({
    username: 'meg',
    password: 'burner',
  })
  expect(token).not.toBeNull
})

test('login user meg works as intended', async () => {
  const userId = await controller.login({
    username: 'meg',
    password: 'burner',
  })
  expect(userId).not.toBeNull
})

test('register creates users properly with spaces', async () => {
  const token = await controller.register({
    username: 'gordon freeman',
    password: 'steam valve',
  })
  expect(token).not.toBeNull
})

test('login user gordan freeman works as intended', async () => {
  const userId = await controller.login({
    username: 'gordon freeman',
    password: 'steam valve',
  })
  expect(userId).not.toBeNull
})

test('wrong user login fails as intended', async () => {
  await expect(async () => {
    await controller.login({
      username: 'ben',
      password: 'flj827sgh',
    })
  }).rejects.toThrow('User not found')
})

afterAll(() => {
  db.end()
})
