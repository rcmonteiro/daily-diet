import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../database'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/signup', async (request, reply) => {
    const { name, email, password } = createUserSchema.parse(request.body)

    const userExists = await db('users').where({ email }).first()

    if (userExists) {
      return reply.status(400).send({ message: 'User already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const [user] = await db('users')
      .insert({
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
      })
      .returning('id')

    reply.cookie('@dailydiet:userId', user.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    reply.status(201).send()
  })

  app.post('/signin', async (request, reply) => {
    const { email, password } = credentialsSchema.parse(request.body)
    const user = await db('users').where({ email }).first('id', 'password')

    if (!user) {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }

    reply.cookie('@dailydiet:userId', user.id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    reply.status(201).send()
  })
}
