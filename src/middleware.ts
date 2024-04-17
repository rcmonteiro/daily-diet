import { FastifyReply, FastifyRequest } from 'fastify'

export const validateSession = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.cookies['@dailydiet:userId']
  if (!userId) {
    return reply.status(401).send()
  }
}
