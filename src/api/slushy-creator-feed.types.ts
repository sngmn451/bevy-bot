export interface FetchResponse {
  body: FetchResponseBody[]
  total: number
  paginationId: string
}

export interface FetchResponseBody {
  creator: Creator
  post: Post
}

export interface Creator {
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
  activeStories: any[]
  hasActiveStories: boolean
  interests: string[]
  socialProof: SocialProof
  live: boolean
  online: boolean
  postCount: number
  postLikesCount: number
  displayAge: number
  nationality: string
  bio: string
  lastOfflineAt: string
  lastOnlineAt: string
  creatorAttributes: string[]
  tipGoalDescription: any
  subGoalDescription: any
  title: any
  viewerCount: number
  chatRank: any
  isAiGenerated: boolean
  chatTipMenuCount: any
  storiesViewed: boolean
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
  description: string
}

export interface SocialProof {
  purchases: number
  subscriptions: number
  lastUpdatedAt: string
  views: number
  totalPostViewCount: number
  events: SocialProofEvent[]
}

export interface SocialProofEvent {
  creatorId: string
  purchasedAt?: string
  eventName: string
  handle?: string
  buyerId?: string
  count?: number
}

export interface Post {
  id: string
  creatorId: string
  caption: string
  hasAdultContent: boolean
  isPinned: boolean
  hashtags: string[]
  taggedUsers: any
  mentionedUsers: any
  likesCount: number
  videosCount: number
  imagesCount: number
  urlsSignedAt: string
  like: any
  type: string
  price?: number
  salesPrice: any
  salesPriceExpiresAt: any
  reported: any
  status: string
  limitedDistribution: boolean
  unlocked: any
  commentsCount: number
  totalTipsAmount: number
  tipsCounter: number
  topLevelCommentCount: number
  hasExternalLink: boolean
  externalLink: any
  externalLinkText: any
  postContentType: string
  spicy: string
  commentControl: string
  socialProof: PostSocialProof
  slushySelect: any
  publishedAt: string
  media: Medum[]
  cover: Cover
}

export interface PostSocialProof {
  views: number
  likes: number
  purchases: number
  lastUpdatedAt: string
  events: PostSocialProofEvent[]
}

export interface PostSocialProofEvent {
  creatorId: string
  purchasedAt?: string
  eventName: string
  handle?: string
  buyerId?: string
  count?: number
}

export interface Medum {
  type: string
  teaser: boolean
  vaultId: string
  objectFit: string
  id: string
  isAIGenerated: boolean
  blurHash: string
  visible: boolean
  mediaUrls: MediaUrls
  metadata?: Metadata
}

export interface MediaUrls {
  movie?: string
  preview?: string
  thumbBlurred?: string
  posterBlurredCroppedSquare?: string
  thumb?: string
  poster?: string
  posterBlurred?: string
  posterCroppedSquare?: string
  blur?: string
  large?: string
  medium?: string
  small?: string
  original?: string
  "blur-cropped-square"?: string
  "cropped-square"?: string
  blurHash?: string
  blurlg?: string
}

export interface Metadata {
  duration: string
}

export interface Cover {
  type: string
  teaser: boolean
  vaultId: string
  objectFit: string
  id: string
  isAIGenerated: boolean
  blurHash: string
  visible: boolean
  mediaUrls: MediaUrls2
  metadata?: Metadata2
}

export interface MediaUrls2 {
  movie?: string
  preview?: string
  thumbBlurred?: string
  posterBlurredCroppedSquare?: string
  thumb: string
  poster?: string
  posterBlurred?: string
  posterCroppedSquare?: string
  blur?: string
  large?: string
  medium?: string
  small?: string
  original?: string
  "blur-cropped-square"?: string
  "cropped-square"?: string
  blurHash?: string
}

export interface Metadata2 {
  duration: string
}
