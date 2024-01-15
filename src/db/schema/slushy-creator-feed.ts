import { boolean, index, integer, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const SlushyCreatorFeeds = pgTable('--slushy-creator-feed', {
  id: varchar('id').unique().primaryKey(),
  creatorId: varchar('creatorId'),
  caption: varchar('caption'),
  hasAdultContent: boolean('hasAdultContent'),
  isPinned: boolean('isPinned'),
  hashTags: jsonb('hashTags'),
  type: varchar('type'),
  status: varchar('status'),
  price: integer('price'),
  salesPrice: integer('salesPrice'),
  salesPriceExpiresAt: timestamp('salesPriceExpiresAt', { withTimezone: true }),
  postContentType: varchar('postContentType'),
  spicy: varchar('spicy'),
  imagesCount: integer('imagesCount'),
  videosCount: integer('videosCount'),
  likesCount: integer('likesCount'),
  commentsCount: integer('commentsCount'),
  totalTipsAmount: integer('totalTipsAmount'),
  tipsCounter: integer('tipsCounter'),
  topLevelCommentCount: integer('topLevelCommentCount'),
  eventViewCount: integer('eventViewCount'),
  eventTotalPostViewCount: integer('eventTotalPostViewCount'),
  eventSubscriptionNew: integer('eventSubscriptionNew'),
  eventPurchaseCount: integer('eventPurchaseCount'),
  eventPurchase: jsonb('eventPurchase'),
  json: jsonb('json'),
  publishedAt: timestamp('publishedAt', { withTimezone: true}),
  createdAt: timestamp('createdAt', { withTimezone: true}),
  updatedAt: timestamp('updatedAt', { withTimezone: true})
}, col => ({
  idxCreatorPostEvent: index('idxCreatorPostEvent').on(col.id, col.imagesCount, col.videosCount, col.likesCount, col.commentsCount, col.totalTipsAmount, col.eventViewCount, col.eventTotalPostViewCount, col.eventSubscriptionNew, col.eventPurchaseCount)
}) )

export type SlushyCreatorFeed = typeof SlushyCreatorFeeds.$inferSelect
export type NewSlushyCreatorFeed = typeof SlushyCreatorFeeds.$inferInsert
