import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../database'

const mealSchema = z.object({
  title: z.string(),
  description: z.string(),
  onDiet: z.boolean(),
})

export const mealsRoutes = async (app: FastifyInstance) => {
  app.post('/', async (request, reply) => {
    const userId = request.cookies['@dailydiet:userId']
    const { title, description, onDiet } = mealSchema.parse(request.body)
    await db('meals').insert({
      id: randomUUID(),
      title,
      description,
      on_diet: onDiet,
      user_id: userId,
      created_at: new Date(),
    })

    reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    const userId = request.cookies['@dailydiet:userId']
    const getMealParams = z.object({
      id: z.string().uuid(),
    })
    const mealId = getMealParams.parse(request.params).id
    const { title, description, onDiet } = mealSchema.parse(request.body)
    await db('meals')
      .update({
        title,
        description,
        on_diet: onDiet,
        updated_at: new Date(),
      })
      .where({ id: mealId, user_id: userId })

    reply.status(204).send()
  })

  app.delete('/:id', async (request, reply) => {
    const userId = request.cookies['@dailydiet:userId']
    const getMealParams = z.object({
      id: z.string().uuid(),
    })
    const mealId = getMealParams.parse(request.params).id
    await db('meals').where({ id: mealId, user_id: userId }).delete()
    reply.status(204).send()
  })

  app.get('/:id', async (request, reply) => {
    const userId = request.cookies['@dailydiet:userId']
    const getMealParams = z.object({
      id: z.string().uuid(),
    })
    const mealId = getMealParams.parse(request.params).id
    const meal = await db('meals')
      .where({ id: mealId, user_id: userId })
      .first('title', 'description', 'on_diet')
    reply.status(200).send({ meal })
  })

  app.get('/', async (request, reply) => {
    const userId = request.cookies['@dailydiet:userId']
    const meals = await db('meals').where({ user_id: userId }).select('*')
    reply.status(200).send({ meals })
  })
}
