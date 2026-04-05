import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

const dummyVector = Array.from({ length: 768 }, () => Math.random())
const now = new Date()
const oneYearAgo = new Date()
oneYearAgo.setFullYear(now.getFullYear() - 1)

await seed(db, { rooms: schema.rooms, questions: schema.questions }).refine(
  (f) => ({
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
        createdAt: f.date({ minDate: now, maxDate: oneYearAgo }),
      },
      with: {
        questions: [
          {
            weight: 1,
            count: 3,
            columns: {
              question: f.loremIpsum(),
              answer: f.loremIpsum(),
              createdAt: f.date({ minDate: now, maxDate: oneYearAgo }),
            },
          },
        ] as any,
      },
    },
  })
)

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
