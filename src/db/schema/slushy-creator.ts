import { index, integer, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const SlushyCreators = pgTable('--slushy-creator', {
  id: varchar('id').unique().primaryKey(),
  subscriptions: integer('subscriptions'),
  price: integer('price'),
  displayName: varchar('displayName'),
  handle: varchar('handle'),
  followersCount: integer('followersCount'),
  follow: integer('follow'),
  postCount: integer('postCount'),
  postLikesCount: integer('postLikesCount'),
  displayAge: integer('displayAge'),
  nationality: varchar('nationality'),
  viewerCount: integer('viewerCount'),
  json: jsonb('json'),
  paginationId: varchar('paginationId'),
  createdAt: timestamp('createdAt', { withTimezone: true}),
  updatedAt: timestamp('updatedAt', { withTimezone: true})
}, col => ({
  idxSubPrice: index('idxSubPrice').on(col.id, col.subscriptions, col.price)
}) )

export type SlushyCreator = typeof SlushyCreators.$inferSelect
export type NewSlushyCreator = typeof SlushyCreators.$inferInsert
