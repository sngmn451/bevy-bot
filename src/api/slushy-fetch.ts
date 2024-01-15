import { Context } from 'hono'
import { db } from '../db/connection'
import { SlushyConfigs, SlushyCreators } from '../db/schema'
import { eq } from 'drizzle-orm'
import { FetchResponse, SlushyCreator } from './slushy-fetch.types'

const baseurl = 'https://api.slushy.com/search/creators/new?gender[]=male'

const paginationKey = 'paginationId'

export async function SlushyFetch (c: Context) {
  const paginationId = await db.select().from(SlushyConfigs).where(eq(SlushyConfigs.key, paginationKey)).limit(1)

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }
  console.log(paginationId.at(0))
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
