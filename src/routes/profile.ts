import { FastifyInstance } from 'fastify'
import { db } from '../database'
import { validateSession } from '../middleware'

export const profileRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', validateSession)

  app.get('/', async (request, reply) => {
    const userId = request.cookies['@dailydiet:userId']
    const user = await db('users').where({ id: userId }).first('name', 'email')
    reply.status(200).send({ user })
  })

  app.get('/stats', async (request, reply) => {
    reply.status(201).send()
  })
}
