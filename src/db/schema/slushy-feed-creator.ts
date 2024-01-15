import { boolean, index, integer, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const SlushyFeedCreators = pgTable('--slushy-fetch-creator', {
  id: varchar('id').unique().primaryKey(),
  displayName: varchar('displayName'),
  handle: varchar('handle'),
  followersCount: integer('followersCount'),
  nonTeaserPremiumImagesCount: integer('nonTeaserPremiumImagesCount'),
  nonTeaserPremiumVideosCount: integer('nonTeaserPremiumVideosCount'),
  subscriptionPlanCycle: varchar('subscriptionPlanCycle'),
  subscriptionPlanPrice: integer('subscriptionPlanPrice'),
  subscriptionPlanSalePrice: integer('subscriptionPlanSalePrice'),
  subscriptionPlanDescription: varchar('subscriptionPlanDescription'),
  socialProofPurchases: integer('socialProofPurchases'),
  socialProofSubscription: integer('socialProofSubscription'),
  socialProofTotalViewCount: integer('socialProofTotalViewCount'),
  follow: varchar('follow'),
  slushyCreatedAt: timestamp('slushyCreatedAt', { withTimezone: true }),
  postCount: integer('postCount'),
  postLikesCount: integer('postLikesCount'),
  displayAge: integer('displayAge'),
  nationality: varchar('nationality'),
  bio: varchar('bio'),
  viewerCount: integer('viewerCount'),
  creatorAttributes: jsonb('creatorAttributes'),
  lastOfflineAt: timestamp('lastOfflineAt', { withTimezone: true}),
  lastOnlineAt: timestamp('lastOnlineAt', { withTimezone: true}),
  json: jsonb('json'),
  paginationId: varchar('paginationId'),
  contentDownloaded: boolean('contentDownloaded').default(false),
  createdAt: timestamp('createdAt', { withTimezone: true}),
  updatedAt: timestamp('updatedAt', { withTimezone: true})
}, col => ({
  idxSubscription: index('idxSubscription').on(col.subscriptionPlanPrice, col.socialProofSubscription),
  idxAge: index('idxAge').on(col.displayAge),
  idxNationality: index('idxNationality').on(col.nationality),
  idxEngagement: index('idxEngagement').on(col.followersCount, col.postCount, col.postLikesCount, col.viewerCount, col.socialProofSubscription, col.socialProofTotalViewCount)
}) )

export type SlushyFeedCreator = typeof SlushyFeedCreators.$inferSelect
export type NewSlushyFeedCreator = typeof SlushyFeedCreators.$inferInsert
