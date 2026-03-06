import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

export const createRoomRouteMock: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),
      },
    },
    (request, reply) => {
      const { name, description } = request.body

      const insertedRoom = {
        id: '3',
      }

      return reply.status(201).send({ roomId: insertedRoom.id })
    }
  )
}
