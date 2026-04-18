import { reset } from 'drizzle-seed'

import rawData from './../data.json' with { type: 'json' }
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

type dbMockProps = {
  id: string
  name: string
  description?: string
  questions: {
    id: string
    question: string
    answer: string | null
  }[]
}[]

const dbMock: dbMockProps = rawData

await reset(db, schema)

const dummyVector = Array.from({ length: 768 }, () => Math.random())
const now = new Date()
const oneYearAgo = new Date()
oneYearAgo.setFullYear(now.getFullYear() - 1)

await db.insert(schema.rooms).values(
  dbMock.map((room) => ({
    id: room.id,
    name: room.name,
    description: room.description,
    createdAt: now,
  }))
)

await db.insert(schema.questions).values(
  dbMock.flatMap((room) =>
    room.questions.map((question) => ({
      roomId: room.id,
      id: question.id,
      question: question.question,
      answer: question.answer,
      createdAt: now,
    }))
  )
)

await db.insert(schema.audioChunks).values(
  dbMock.map((room) => ({
    roomId: room.id,
    transcription: `Transcrição realista para: ${room.name}`,
    embeddings: dummyVector,
  }))
)

await sql.end()

console.log('🌱 >>> Database seeded')
