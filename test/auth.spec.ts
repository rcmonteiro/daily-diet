import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { app } from '../src/app'

describe('Auth routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to sign-up', async () => {
    await request(app.server)
      .post('/signup')
      .send({
        name: 'Test User',
        email: 'test@email.com',
        password: '123123',
      })
      .expect(201)
  })

  it('should be able to sign-in', async () => {
    await request(app.server).post('/signup').send({
      name: 'Test User',
      email: 'test@email.com',
      password: '123123',
    })
    await request(app.server)
      .post('/signin')
      .send({
        email: 'test@email.com',
        password: '123123',
      })
      .expect(204)
  })
})
