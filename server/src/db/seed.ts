import { reset, seed } from 'drizzle-seed'

import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

const dummyVector = Array.from({ length: 768 }, () => Math.random())

await seed(db, { rooms: schema.rooms, questions: schema.questions })

const allRooms = await db.select().from(schema.rooms)

for (const room of allRooms) {
  db.insert(schema.audioChunks).values({
    roomId: room.id,
    transcription: 'Transcrição de teste',
    embeddings: dummyVector,
  })
}

await sql.end()

console.log('🌱 >>> Database seeded')
