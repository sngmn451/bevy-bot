import { Context } from 'hono'
import { db } from '../db/connection'
import { SlushyConfigs, SlushyCreators } from '../db/schema'
import { eq } from 'drizzle-orm'
import { FetchResponse, SlushyCreator } from './slushy-fetch.types'

const baseurl = 'https://api.slushy.com/recommendation/top-creators?gender[]=male'

const paginationKey = 'paginationId'

export async function SlushyTopCreatorFetch (c: Context) {

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }
  const url = baseurl

  const data = await (await fetch(url, {
    headers
  })).json() as FetchResponse

  const newPaginationId = data.paginationId

  await saveCreator(data.body, newPaginationId)
  return c.text('Success')
}


async function saveCreator (creators: SlushyCreator[], paginationId: string) {
  const now = new Date()
  await Promise.all(await creators.map(async creator => {
    await db.insert(SlushyCreators).values({
      id: creator.id,
      subscriptions: creator.socialProof.subscriptions,
      displayName: creator.displayName,
      handle: creator.handle,
      followersCount: creator.followersCount,
      follow: creator.follow,
      postCount: creator.postCount,
      postLikesCount: creator.postLikesCount,
      displayAge: creator.displayAge || null,
      nationality: creator.nationality || null,
      viewerCount: creator.viewerCount,
      price: creator.subscriptionPlan.price,
      json: creator,
      paginationId,
      createdAt: now,
      updatedAt: now
    }).onConflictDoNothing({
      target: SlushyCreators.id
    })
    console.log('Creator saved', creator.displayName)
  }))
}
