import { Context } from 'hono'
import { db } from '../db/connection'
import { SlushyConfigs, SlushyFeedCreators } from '../db/schema'
import { eq } from 'drizzle-orm'
import { FetchResponse, FetchResponseBody } from './slushy-feed.types'

const baseurl = 'https://api.slushy.com/search/feed?sort=new&showLimitedDistribution=false&markAsSeen=true'

const paginationKey = 'slushyFeedPaginationId'

export async function SlushyFeedFetch (c: Context) {
  const paginationId = await db.select().from(SlushyConfigs).where(eq(SlushyConfigs.key, paginationKey)).limit(1)

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }
  const url = `${baseurl}${(paginationId.length === 1)?`&paginationId=${paginationId.at(0)?.value}`:''}`

  const data = await (await fetch(url, {
    headers
  })).json() as FetchResponse

  const newPaginationId = data.paginationId

  await savePaginationId(newPaginationId)
  await saveCreator(data.body, newPaginationId)
  return c.text('Success')
}

async function savePaginationId (id: string) {
  const updatedAt = new Date()
  await db.insert(SlushyConfigs).values({
    key: paginationKey,
    value: id,
    updatedAt
  }).onConflictDoUpdate({
    set: {
      value: id,
      updatedAt
    },
    target: SlushyConfigs.key
  })
  console.log('Pagination saved', id)
}



async function saveCreator (body: FetchResponseBody[], paginationId: string) {
  const now = new Date()
  await Promise.all(await body.map(async item => {
    const { creator } = item
    await db.insert(SlushyFeedCreators).values({
      id: creator.id,
      displayName: creator.displayName,
      handle: creator.handle,
      followersCount: creator.followersCount,
      follow: creator.follow,
      postCount: creator.postCount,
      postLikesCount: creator.postLikesCount,
      displayAge: creator.displayAge || null,
      nationality: creator.nationality || null,
      viewerCount: creator.viewerCount,
      json: creator,
      paginationId,
      nonTeaserPremiumImagesCount: creator.nonTeaserPremiumImagesCount,
      nonTeaserPremiumVideosCount: creator.nonTeaserPremiumImagesCount,
      subscriptionPlanCycle: creator.subscriptionPlan.rebillingCycle,
      subscriptionPlanPrice: creator.subscriptionPlan.price,
      subscriptionPlanSalePrice: creator.subscriptionPlan.salesPrice || null,
      subscriptionPlanDescription: creator.subscriptionPlan.description,
      socialProofPurchases: creator.socialProof.purchases,
      socialProofSubscription: creator.socialProof.subscriptions,
      socialProofTotalViewCount: creator.socialProof.totalPostViewCount,
      bio: creator.bio,
      creatorAttributes: creator.creatorAttributes || [],
      lastOfflineAt: new Date(creator.lastOfflineAt),
      lastOnlineAt: new Date(creator.lastOnlineAt),
      slushyCreatedAt: new Date(creator.createdAt),
      createdAt: now,
      updatedAt: now
    }).onConflictDoNothing({
      target: SlushyFeedCreators.id
    })
    console.log('Creator saved', creator.displayName)
  }))
}
