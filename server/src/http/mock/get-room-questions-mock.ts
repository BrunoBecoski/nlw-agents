import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { getQuestionsMock } from '../../mock.ts'

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

      const questions = getQuestionsMock(roomId)

      return questions
    }
  )
}
