CREATE TABLE IF NOT EXISTS "--slushy-user" (
	"id" varchar,
	"subscriptions" integer,
	"price" integer,
	"json" jsonb,
	"paginationId" varchar,
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "--slushy-user_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "--slushy-config" (
	"key" varchar,
	"value" varchar,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "--slushy-config_key_unique" UNIQUE("key")
);
