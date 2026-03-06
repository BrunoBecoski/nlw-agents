import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { checkDatabase } from './db/connection.ts'
import { env } from './env.ts'
import { createQuestionRouteMock } from './http/mock/create-question-mock.ts'
import { createRoomRouteMock } from './http/mock/create-room-mock.ts'
import { getRoomQuestionsRouteMock } from './http/mock/get-room-questions-mock.ts'
import { getRoomsRouteMock } from './http/mock/get-rooms-mock.ts'
import { uploadAudioRouteMock } from './http/mock/upload-audio-mock.ts'
import { createQuestionRoute } from './http/routes/create-questions.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.register(fastifyMultipart)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

const hasDatabase = await checkDatabase()

if (hasDatabase) {
  app.register(getRoomsRoute)
  app.register(createRoomRoute)
  app.register(getRoomQuestionsRoute)
  app.register(createQuestionRoute)
  app.register(uploadAudioRoute)
} else {
  app.register(getRoomsRouteMock)
  app.register(createRoomRouteMock)
  app.register(getRoomQuestionsRouteMock)
  app.register(createQuestionRouteMock)
  app.register(uploadAudioRouteMock)
}

app.listen({ port: env.PORT }).then(() => {
  console.log('🚀 >>> HTTP server running!')
  console.log(`🚪 >>> ${env.PORT}`)
})
