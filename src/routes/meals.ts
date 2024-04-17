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
    reply.status(201).send()
  })

  app.delete('/:id', async (request, reply) => {
    reply.status(201).send()
  })

  app.get('/:id', async (request, reply) => {
    reply.status(201).send()
  })

  app.get('/', async (request, reply) => {
    const userId = request.cookies['@dailydiet:userId']
    const meals = await db('meals').where({ user_id: userId }).select('*')
    reply.status(200).send({ meals })
  })
}
