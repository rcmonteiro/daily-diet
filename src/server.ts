import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { env } from './env'
import { authRoutes } from './routes/auth'
import { mealsRoutes } from './routes/meals'
import { profileRoutes } from './routes/profile'

const app = fastify()

app.register(fastifyCookie)
app.register(authRoutes, { prefix: '/' })
app.register(profileRoutes, { prefix: '/profile' })
app.register(mealsRoutes, { prefix: '/meals' })

app.get('/', async () => {
  return 'Hello World'
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`[${env.NODE_ENV}] Server running on port ${env.PORT}`)
})
