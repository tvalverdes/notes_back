import supertest from 'supertest'
import app from '../src/server.js'
import { server } from '../src/app.js'
import { disconnectDb } from '../src/utils/dbconnection.js'
import { User } from '../src/models/user.model.js'

const api = supertest(app)
const correctCredentials = {
  email: 'test@test.com',
  password: 'test1234',
}
const incorrectEmail = {
  email: 'test@testing.com',
  password: 'test1234',
}
const incorrectPassword = {
  email: 'test@test.com',
  password: 'test1212321',
}
const missingCredentials = { password: 'test1212321' }
const loginRoute = '/auth/login'
const registerRoute = '/auth/register'

describe('Authentification', () => {
  describe('Login', () => {
    test('should login with correct credentials', async () => {
      await api.post(loginRoute).send(correctCredentials).expect(200)
    }),
      test('should not login with wrong email', async () => {
        await api.post(loginRoute).send(incorrectEmail).expect(404)
      }),
      test('should not login with wrong password', async () => {
        await api.post(loginRoute).send(incorrectPassword).expect(404)
      }),
      test('should not login with missing credentials', async () => {
        await api.post(loginRoute).send(missingCredentials).expect(400)
      })
  }),
    describe('Register', () => {
      test('should register with correct credentials', async () => {
        await api.post(registerRoute).send(correctCredentials).expect(200)
      }),
        test('should not login with wrong email', async () => {
          await api.post(registerRoute).send(incorrectEmail).expect(404)
        }),
        test('should not login with wrong password', async () => {
          await api.post(registerRoute).send(incorrectPassword).expect(404)
        }),
        test('should not login with missing credentials', async () => {
          await api.post(registerRoute).send(missingCredentials).expect(400)
        })
    })
})

afterAll(async () => {
  try {
    await Promise.all([
      User.deleteOne({ email: correctCredentials.email }),
      disconnectDb(),
      new Promise((resolve) => server.close(resolve)),
    ])
  } catch (error) {
    console.error('Error during cleanup:', error)
  }
})
