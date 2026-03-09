import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

import dbMock from '../../../db-mock.json' with { type: 'json' }

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

      const result = [...dbMock.questions]

      return result
    }
  )
}
