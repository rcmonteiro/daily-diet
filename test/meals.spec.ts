import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { app } from '../src/app'

describe('Meals routes', () => {
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

  it('should be able to add a new meal', async () => {
    const newUserSignup = await request(app.server).post('/signup').send({
      name: 'Test User',
      email: 'test@email.com',
      password: '123123',
    })

    const cookies = newUserSignup.get('Set-Cookie') ?? []

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        title: 'Torrada com queijo branco',
        description: 'Torrada com queijo branco',
        onDiet: true,
      })
      .expect(201)
  })

  it('should be able to edit a meal', async () => {
    const newUserSignup = await request(app.server).post('/signup').send({
      name: 'Test User',
      email: 'test@email.com',
      password: '123123',
    })

    const cookies = newUserSignup.get('Set-Cookie') ?? []

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        title: 'Torrada com queijo branco',
        description: 'Torrada com queijo branco',
        onDiet: true,
      })
      .expect(201)

    const meals = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = meals.body.meals[0].id

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .send({
        title: 'Torrada com queijo branco editada',
        description: 'Torrada com queijo branco',
        onDiet: true,
      })
      .expect(204)
  })

  it('should be able to delete a meal', async () => {
    const newUserSignup = await request(app.server).post('/signup').send({
      name: 'Test User',
      email: 'test@email.com',
      password: '123123',
    })

    const cookies = newUserSignup.get('Set-Cookie') ?? []

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        title: 'Torrada com queijo branco',
        description: 'Torrada com queijo branco',
        onDiet: true,
      })
      .expect(201)

    const meals = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = meals.body.meals[0].id

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(204)
  })
})
