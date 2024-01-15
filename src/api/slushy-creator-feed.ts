import { Context } from 'hono'
import { db } from '../db/connection'
import { NewSlushyCreatorFeed, SlushyConfigs, SlushyCreatorFeeds, SlushyFeedCreators } from '../db/schema'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { FetchResponse, FetchResponseBody, PostSocialProofEvent } from './slushy-creator-feed.types'

const baseurl = 'https://api.slushy.com/search/feed?hideOnMain=false&sort=new&showLimitedDistribution=false'

const paginationKey = 'slushyCreatorFeedPaginationId'

export async function SlushyCreatorFeedFetch (c: Context) {
  const response = await db.select({
    id: SlushyFeedCreators.id,
    handle: SlushyFeedCreators.handle,
    subs: SlushyFeedCreators.socialProofSubscription
  }).from(SlushyFeedCreators).where(and(
    eq(SlushyFeedCreators.contentDownloaded, false)
  )).orderBy(desc(SlushyFeedCreators.socialProofSubscription)).limit(1)

  if (response.length === 0) {
    return c.text('All creators fetched')
  }

  const creator = response.at(0)
  const paginationId = await db.select().from(SlushyConfigs).where(eq(SlushyConfigs.key, `${paginationKey}-${creator?.id}`)).limit(1)


  const url = `${baseurl}${(paginationId.length === 1)?`&paginationId=${paginationId.at(0)?.value}`:''}&creatorId=${creator?.id}`

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }

  const data = await (await fetch(url, {
    headers
  })).json() as FetchResponse

  const newPaginationId = data.paginationId

  await saveCreatorFeed(data.body)
  await savePaginationId(newPaginationId, creator?.id as string)

  return c.text('Success')
}

async function savePaginationId (id: string, creatorId: string) {
  const updatedAt = new Date()
  await db.insert(SlushyConfigs).values({
    key: `${paginationKey}-${creatorId}`,
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



async function saveCreatorFeed (body: FetchResponseBody[]) {
  //Check if all post duplicated and mark as done.
  let newPostIds = body.map(item => item.post.id)

  if (newPostIds.length === 0) {
    return
  }
  const duplicatedPostIds = (await db.select({
    id: SlushyCreatorFeeds.id
  }).from(SlushyCreatorFeeds).where(inArray(SlushyCreatorFeeds.id, newPostIds)).execute()).map(item => item.id)

  const creator = body.at(0)?.creator

  if(newPostIds.length === duplicatedPostIds.length) {
    await db.update(SlushyFeedCreators).set({
      contentDownloaded: true
    }).where(eq(SlushyFeedCreators.id, creator?.id as string))
    console.log('Updated contentDownloaded: true for', creator?.displayName)
    return
  }

  const now = new Date()
  await Promise.all(await body.map(async item => {
    const { creator, post } = item
    const value: NewSlushyCreatorFeed = {
      id: post.id,
      creatorId: post.creatorId,
      caption: post.caption,
      hasAdultContent: post.hasAdultContent,
      isPinned: post.isPinned,
      hashTags: post.hashtags || [],
      type: post.type,
      status: post.status,
      price: post.price as number,
      salesPrice: post.salesPrice,
      postContentType: post.postContentType,
      spicy: post.spicy,
      imagesCount: post.imagesCount,
      videosCount: post.videosCount,
      likesCount: post.likesCount,
      commentsCount: post.commentsCount,
      totalTipsAmount: post.totalTipsAmount,
      tipsCounter: post.tipsCounter,
      topLevelCommentCount: post.topLevelCommentCount,
      eventViewCount: eventViewCount(post.socialProof.events),
      eventTotalPostViewCount: eventTotalPostViewCount(post.socialProof.events),
      eventSubscriptionNew: eventSubscriptionNew(post.socialProof.events),
      eventPurchaseCount: eventPurchaseCount(post.socialProof.events),
      eventPurchase: eventPurchase(post.socialProof.events),
      json: post,
      publishedAt: new Date(post.publishedAt),
      createdAt: now,
      updatedAt: now
    }
    if (post.salesPriceExpiresAt) {
      value.salesPriceExpiresAt = new Date(post.salesPriceExpiresAt)
    }
    await db.insert(SlushyCreatorFeeds).values(value).onConflictDoNothing({
      target: SlushyCreatorFeeds.id
    })
    console.log('Saved post:', post.id, 'by', creator.displayName)
  }))  
}

function eventViewCount (event: PostSocialProofEvent[]): number {
  return event.find(item => item.eventName === 'viewCount')?.count || 0
}

function eventTotalPostViewCount (event: PostSocialProofEvent[]): number {
  return event.find(item => item.eventName === 'totalPostViewCount')?.count || 0
}
function eventSubscriptionNew (event: PostSocialProofEvent[]): number {
  return event.find(item => item.eventName === 'subscriptionNew')?.count || 0
}
function eventPurchaseCount (event: PostSocialProofEvent[]): number {
  return event.find(item => item.eventName === 'purchaseCount')?.count || 0
}
function eventPurchase (event: PostSocialProofEvent[]) {
  return event.filter(item => item.eventName === 'purchase')
}
