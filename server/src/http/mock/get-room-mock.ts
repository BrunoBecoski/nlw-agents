import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { getRoomMock } from '../../mock.ts'

export const getRoomRouteMock: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/room/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    (request) => {
      const { id } = request.params
      const rooms = getRoomMock(id)

      return [rooms]
    }
  )
}
