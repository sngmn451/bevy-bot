import { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config({
  path: '.env'
})

export default {
  schema: './src/db/schema/index.ts',
  out: './migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DBURL as string
  }
} satisfies Config
