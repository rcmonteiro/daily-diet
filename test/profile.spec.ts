import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('Profile routes', () => {
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

  it('should be able to get profile', async () => {
    const newUserSignup = await request(app.server).post('/signup').send({
      name: 'Test User',
      email: 'test@email.com',
      password: '123123',
    })

    const cookies = newUserSignup.get('Set-Cookie') ?? []

    const userProfile = await request(app.server)
      .get('/profile')
      .set('Cookie', cookies)
      .expect(200)
    expect(userProfile.body.user).toEqual({
      name: 'Test User',
      email: 'test@email.com',
    })
  })

  it('should be able to get user stats', async () => {
    const newUserSignup = await request(app.server).post('/signup').send({
      name: 'Test User',
      email: 'test@email.com',
      password: '123123',
    })

    const cookies = newUserSignup.get('Set-Cookie') ?? []

    const userProfile = await request(app.server)
      .get('/profile/stats')
      .set('Cookie', cookies)
      .expect(200)

    expect(userProfile.body).toEqual({
      bestSequence: 0,
      total: 0,
      onDiet: 0,
      notOnDiet: 0,
    })
  })
})
