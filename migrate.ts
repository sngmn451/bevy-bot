const drizzle = require('drizzle-orm/postgres-js').drizzle
const migrate = require('drizzle-orm/postgres-js/migrator').migrate
const postgres = require('postgres')
const config = require('dotenv').config
config({
  path: '.env'
})

const sql = postgres(process.env.DBURL, { max: 1 })
const db = drizzle(sql)

async function main () {
  console.log('Migration start...')
  await migrate(db, { migrationsFolder: 'migration' })
  console.log('Migration completed...')
  
  process.exit(0)  
}
main().catch(err => {
  console.log(err)
  process.exit(0)
})
