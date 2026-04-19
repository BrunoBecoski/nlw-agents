import { reset } from 'drizzle-seed'

import rawData from './../data.json' with { type: 'json' }
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

type dbMockProps = {
  id: string
  name: string
  description?: string
  daysAgo: number
  questions: {
    id: string
    question: string
    answer: string | null
    daysAgo: number
  }[]
}[]

const dbMock: dbMockProps = rawData

await reset(db, schema)

const dummyVector = Array.from({ length: 768 }, () => Math.random())

function getPastDate(daysAgo: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date
}

await db.insert(schema.rooms).values(
  dbMock.map((room) => ({
    id: room.id,
    name: room.name,
    description: room.description,
    createdAt: getPastDate(room.daysAgo),
  }))
)

await db.insert(schema.questions).values(
  dbMock.flatMap((room) =>
    room.questions.map((question) => ({
      roomId: room.id,
      id: question.id,
      question: question.question,
      answer: question.answer,
      createdAt: getPastDate(question.daysAgo),
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
