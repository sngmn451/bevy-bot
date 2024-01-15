CREATE TABLE IF NOT EXISTS "--slushy-creator" (
	"id" varchar,
	"subscriptions" integer,
	"price" integer,
	"json" jsonb,
	"paginationId" varchar,
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "--slushy-creator_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DROP TABLE "--slushy-user";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idxSubPrice" ON "--slushy-creator" ("id","subscriptions","price");