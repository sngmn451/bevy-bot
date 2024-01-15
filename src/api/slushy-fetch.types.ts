export interface FetchResponse {
  body: SlushyCreator[]
  total: number
  paginationId: string
}

export interface SlushyCreator {
  type: string
  id: string
  displayName: string
  handle: string
  accountType: string
  createdAt: string
  sellerApprovedAt: string
  profileImage: ProfileImage
  followersCount: number
  nonTeaserPremiumImagesCount: number
  nonTeaserPremiumVideosCount: number
  subscriptionPlan: SubscriptionPlan
  follow: any
  official: boolean
  activeStories: string[]
  hasActiveStories: boolean
  interests: string[]
  socialProof: SocialProof
  live: boolean
  online: boolean
  postCount: number
  postLikesCount: number
  displayAge?: number
  nationality?: string
  bio: string
  lastOfflineAt: string
  lastOnlineAt: string
  creatorAttributes?: string[]
  tipGoalDescription: any
  subGoalDescription: any
  title: any
  viewerCount: number
  chatRank?: number
  isAiGenerated: boolean
}

export interface ProfileImage {
  blur: string
  large: string
  medium: string
  small: string
  thumb: string
  original: string
  "blur-cropped-square": string
  "cropped-square": string
}

export interface SubscriptionPlan {
  planId: string
  rebillingCycle: string
  renewalDate: string
  price: number
  tier: string
  status: string
  createdAt: string
  type: string
  description?: string
  salesPrice?: number
  salesPriceExpiresAt?: string
}

export interface SocialProof {
  purchases: number
  subscriptions: number
  lastUpdatedAt: string
  views: number
  totalPostViewCount: number
  events: Event[]
}

export interface Event {
  creatorId: string
  purchasedAt?: string
  count?: number
  eventName: string
  handle?: string
  buyerId?: string
}
