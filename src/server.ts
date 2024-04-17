import { app } from './app'
import { env } from './env'

app.listen({ port: env.PORT }).then(() => {
  console.log(`[${env.NODE_ENV}] Server running on port ${env.PORT}`)
})
