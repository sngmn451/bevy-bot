import { index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const Configs = pgTable('config', {
  key: varchar('key').unique().primaryKey(),
  value: varchar('value'),
  updatedAt: timestamp('updatedAt', { withTimezone: true})
}, col => ({
  idxConfigKey: index('idxConfigKey').on(col.key)
}) )

export type Config = typeof Configs.$inferSelect
export type NewConfig = typeof Configs.$inferInsert
