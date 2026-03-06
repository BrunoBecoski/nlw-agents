import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

export const uploadAudioRouteMock: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    (request, reply) => {
      const { roomId } = request.params

      return reply.status(201).send({ chunkId: '1' })
    }
  )
}
