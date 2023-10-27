import request from 'supertest'
import app from '../src/server.js'

const email = ''
const password = ''

describe('GET /auth/login', () => {
  test('should respond with status code 200', async () => {
    const response = await request(app)
      .get('/auth/login')
      .auth(email, password)
      .expect(200)
      .send()
  })

  test('should respond with an array', async () => {
    const response = await request(app)
      .get('/notes')
      .auth(email, password)
      .expect([200, 401])
      .send()
    expect(response.body).toBeInstanceOf(Object)
  })
})
