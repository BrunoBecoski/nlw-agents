import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

export const getRoomsRouteMock: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', () => {
    const results = [
      {
        id: '1',
        name: 'Nome',
        createAt: new Date(),
        questionsCount: 5,
      },
    ]

    return results
  })
}
