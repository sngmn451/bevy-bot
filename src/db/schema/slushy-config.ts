import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const SlushyConfigs = pgTable('--slushy-config', {
  key: varchar('key').unique().primaryKey(),
  value: varchar('value'),
  updatedAt: timestamp('updatedAt', { withTimezone: true})
})

export type SlushyConfig = typeof SlushyConfigs.$inferSelect
export type NewSlushyConfig = typeof SlushyConfigs.$inferInsert
