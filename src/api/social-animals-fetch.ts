import { Context } from 'hono'
import { db } from '../db/connection'
import { SocialAnimals, Configs } from '../db/schema'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { FetchResponse } from './social-animals-fetch.types'

const baseurl = 'https://animalia.bio/api/animals/get'

const paginationKey = 'AnimaldotBioSocialAnimalPaginationKey'

export async function SocialAnimalFetch (c: Context) {
  const paginationId = await db.select().from(Configs).where(eq(Configs.key, paginationKey)).limit(1) || 1

  const url = `${baseurl}?page=${paginationId.at(0)?.value}`

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    method: 'POST',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  const data = await (await fetch(url, {
    headers,
  })).json() as FetchResponse

  const newPaginationId = data.data.current_page

  console.log({newPaginationId})
  // await saveCreatorFeed(data.body)
  // await savePaginationId(newPaginationId, creator?.id as string)
  return c.json(data)
  return c.text('Success')
}

async function savePaginationId (id: string, creatorId: string) {
  const updatedAt = new Date()
  await db.insert(Configs).values({
    key: `${paginationKey}-${creatorId}`,
    value: id,
    updatedAt
  }).onConflictDoUpdate({
    set: {
      value: id,
      updatedAt
    },
    target: Configs.key
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
