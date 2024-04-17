import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { mealsRoutes } from './routes/meals'
import { profileRoutes } from './routes/profile'

export const app = fastify()

app.register(fastifyCookie)
app.register(authRoutes, { prefix: '/' })
app.register(profileRoutes, { prefix: '/profile' })
app.register(mealsRoutes, { prefix: '/meals' })
