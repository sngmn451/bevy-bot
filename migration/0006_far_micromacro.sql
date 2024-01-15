CREATE TABLE IF NOT EXISTS "--slushy-creator-feed" (
	"id" varchar PRIMARY KEY NOT NULL,
	"creatorId" varchar,
	"caption" varchar,
	"hasAdultContent" boolean,
	"isPinned" boolean,
	"hashTags" jsonb,
	"type" varchar,
	"status" varchar,
	"price" integer,
	"salesPrice" integer,
	"salesPriceExpiresAt" timestamp with time zone,
	"postContentType" varchar,
	"spicy" varchar,
	"imagesCount" integer,
	"videosCount" integer,
	"likesCount" integer,
	"commentsCount" integer,
	"totalTipsAmount" integer,
	"tipsCounter" integer,
	"topLevelCommentCount" integer,
	"eventViewCount" integer,
	"eventTotalPostViewCount" integer,
	"eventSubscriptionNew" integer,
	"eventPurchaseCount" integer,
	"eventPurchase" jsonb,
	"json" jsonb,
	"publishedAt" timestamp with time zone,
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "--slushy-creator-feed_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "--slushy-creator" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "--slushy-creator" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "--slushy-config" ADD PRIMARY KEY ("key");--> statement-breakpoint
ALTER TABLE "--slushy-config" ALTER COLUMN "key" SET NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idxCreatorPostEvent" ON "--slushy-creator-feed" ("id","imagesCount","videosCount","likesCount","commentsCount","totalTipsAmount","eventViewCount","eventTotalPostViewCount","eventSubscriptionNew","eventPurchaseCount");
