import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

import dbMock from '../../../db-mock.json' with { type: 'json' }

export const getRoomsRouteMock: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', () => {
    const rooms = dbMock.rooms

    const results = [...rooms]

    return results
  })
}
