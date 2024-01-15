import { index, integer, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const SocialAnimals = pgTable('social-animals', {
  id: integer('id').unique().primaryKey(),
  scientific_name: varchar('scientific_name'),
  title: varchar('title'),
  appearance: varchar('appearance'),
  json: jsonb('json'),
  createdAt: timestamp('createdAt', { withTimezone: true}),
  updatedAt: timestamp('updatedAt', { withTimezone: true})
}, col => ({
  idxSocialAnimalName: index('idxSocialAnimalName').on(col.id, col.title)
}))

export type SocialAnimal = typeof SocialAnimals.$inferSelect
export type NewSocialAnimal = typeof SocialAnimals.$inferInsert
