import { Context } from 'hono'
import { db } from '../db/connection'
import { type NewSocialAnimal, SocialAnimals, Configs } from '../db/schema'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { FetchResponse, FetchResponseData } from './social-animals-fetch.types'

const baseurl = 'https://animalia.bio/api/animals/get'

const paginationKey = 'AnimaldotBioSocialAnimalPaginationKey'

export async function SocialAnimalFetch (c: Context) {
  const paginationId = await db.select().from(Configs).where(eq(Configs.key, paginationKey)).limit(1)

  const url = `${baseurl}?page=${paginationId.at(0)?.value ? Number(paginationId.at(0)?.value)+1 : 1}`

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }

  var body = {
    'filter[default_taxonomy]': '0',
    'filter[letter]': '',
    'filter[sort]': 'popularity',
    'filter[group]': 'none',
    'filter[custom_list]': '',
    'filter[lang]': 'en',
    'filter[auth]': 0,
    'filter[page_cache_type]': 'property',
    'filter[page_cache_id]': 83,
    'filter[group_id]': '',
    'filter[without_filters]': 1,
    'filter[property][social_behaviors]': 83
  }

  const formBody = new URLSearchParams()
  for (let property in body) {
    formBody.append(property, body[property])
  }

  const data = await (await fetch(url, {
    headers,
    method: 'post',
    body: formBody
  })).json() as FetchResponse

  const newPaginationId = data.data.current_page

  // console.log({newPaginationId})
  await saveAnimals(data.data.data)
  await savePaginationId(newPaginationId)
  // return c.json(data)
  return c.text('Success')
}

async function savePaginationId (id: number) {
  const updatedAt = new Date()
  await db.insert(Configs).values({
    key: paginationKey,
    value: String(id),
    updatedAt
  }).onConflictDoUpdate({
    set: {
      value: String(id),
      updatedAt
    },
    target: Configs.key
  })
  console.log('Pagination saved', id)
}



async function saveAnimals (body: FetchResponseData[]) {
  const now = new Date()
  await Promise.all(await body.map(async item => {
    const value: NewSocialAnimal = {
      id: item.id,
      scientific_name: item.scientific_name,
      title: item.meta.title,
      appearance: item.meta.appearance,
      json: item,
      createdAt: now,
      updatedAt: now
    }
    await db.insert(SocialAnimals).values(value).onConflictDoNothing({
      target: SocialAnimals.id
    })
    console.log('Saved post:', value.title)
  }))  
}

