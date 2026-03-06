import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

export const createQuestionRouteMock: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    (request, reply) => {
      const { roomId } = request.params
      const { question } = request.body

      return reply.status(201).send({
        questionId: 'c',
        answer: 'resposta',
      })
    }
  )
}
