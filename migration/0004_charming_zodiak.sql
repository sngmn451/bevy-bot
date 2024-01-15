CREATE TABLE IF NOT EXISTS "--slushy-fetch-creator" (
	"id" varchar PRIMARY KEY NOT NULL,
	"displayName" varchar,
	"handle" varchar,
	"followersCount" integer,
	"nonTeaserPremiumImagesCount" integer,
	"nonTeaserPremiumVideosCount" integer,
	"subscriptionPlanCycle" varchar,
	"subscriptionPlanPrice" integer,
	"subscriptionPlanSalePrice" integer,
	"subscriptionPlanDescription" varchar,
	"socialProofPurchases" integer,
	"socialProofSubscription" integer,
	"socialProofTotalViewCount" integer,
	"follow" varchar,
	"slushyCreatedAt" timestamp with time zone,
	"postCount" integer,
	"postLikesCount" integer,
	"displayAge" integer,
	"nationality" varchar,
	"bio" varchar,
	"viewerCount" integer,
	"creatorAttributes" jsonb,
	"lastOfflineAt" timestamp with time zone,
	"lastOnlineAt" timestamp with time zone,
	"json" jsonb,
	"paginationId" varchar,
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "--slushy-fetch-creator_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idxSubscription" ON "--slushy-fetch-creator" ("subscriptionPlanPrice","socialProofSubscription");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idxAge" ON "--slushy-fetch-creator" ("displayAge");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idxNationality" ON "--slushy-fetch-creator" ("nationality");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idxEngagement" ON "--slushy-fetch-creator" ("followersCount","postCount","postLikesCount","viewerCount","socialProofSubscription","socialProofTotalViewCount");