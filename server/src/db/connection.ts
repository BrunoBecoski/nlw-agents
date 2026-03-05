import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '../env.ts'
import { schema } from './schema/index.ts'

export const sql = postgres(env.DATABASE_URL)
export const db = drizzle(sql, {
  schema,
  casing: 'snake_case',
})

export async function checkDatabase() {
  try {
    await sql`SELECT 1`
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
