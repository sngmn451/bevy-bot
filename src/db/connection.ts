import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const queryClient = postgres(Bun.env.DBURL as string)
export const db = drizzle(queryClient, { schema })
