import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { env } from './env'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(fastifyCookie)
app.register(authRoutes, { prefix: '/' })

app.get('/', async () => {
  return 'Hello World'
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`[${env.NODE_ENV}] Server running on port ${env.PORT}`)
})
