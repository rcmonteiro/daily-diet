import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('-------------------------')
  console.error('Invalid environment variables', _env.error.format())
  console.error('-------------------------')
  throw new Error('Invalid environment variables')
}

export const env = _env.data
