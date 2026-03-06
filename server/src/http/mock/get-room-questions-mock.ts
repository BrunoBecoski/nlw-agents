import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

export const getRoomQuestionsRouteMock: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    (request) => {
      const { roomId } = request.params

      const result = [
        {
          id: '1',
          question: 'pergunta',
          answer: 'resposta',
          createdAt: new Date(),
        },
      ]

      return result
    }
  )
}
