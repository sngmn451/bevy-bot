import { Hono } from 'hono'
import { SlushyFetch } from './api/slushy-fetch'
import { SlushyTopCreatorFetch } from './api/slushy-top-creator-fetch'
import { SlushyFeedFetch } from './api/slushy-feed'
import { SlushyCreatorFeedFetch } from './api/slushy-creator-feed'
import { SocialAnimalFetch } from './api/social-animals-fetch'

const app = new Hono()

app.get('/api/slushy/fetch', SlushyFetch)
app.get('/api/slushy/fetch-top-creator', SlushyTopCreatorFetch)
app.get('/api/slushy/fetch/feed', SlushyFeedFetch)
app.get('/api/slushy/fetch/creator/feed', SlushyCreatorFeedFetch)
app.get('/api/social-animals', SocialAnimalFetch)

export default app
