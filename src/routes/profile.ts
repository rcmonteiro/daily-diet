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
    const userId = request.cookies['@dailydiet:userId']

    const mealStats = await db('meals')
      .select('on_diet')
      .count('id', { as: 'count' })
      .groupBy('on_diet')
      .where({ user_id: userId })

    const stats = mealStats.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc, meal: any) => {
        acc.total += Number(meal.count)
        if (!meal.on_diet) {
          acc.notOnDiet += Number(meal.count)
        } else {
          acc.onDiet += Number(meal.count)
        }
        return acc
      },
      {
        total: 0,
        onDiet: 0,
        notOnDiet: 0,
      },
    )

    const allMeals = await db('meals')
      .where({ user_id: userId })
      .select('on_diet')
      .orderBy('created_at', 'desc')

    const { bestSequence } = allMeals.reduce(
      (acc, meal) => {
        if (meal.on_diet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }
        acc.bestSequence = Math.max(acc.bestSequence, acc.currentSequence)
        return acc
      },
      {
        bestSequence: 0,
        currentSequence: 0,
      },
    )

    reply.status(200).send({
      bestSequence,
      ...stats,
    })
  })
}
