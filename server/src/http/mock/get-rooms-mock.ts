import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

import { getRoomsMock } from '../../mock.ts'

export const getRoomsRouteMock: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', () => {
    const rooms = getRoomsMock()

    return rooms
  })
}
