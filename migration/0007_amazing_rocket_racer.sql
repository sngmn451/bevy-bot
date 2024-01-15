CREATE TABLE IF NOT EXISTS "config" (
	"key" varchar PRIMARY KEY NOT NULL,
	"value" varchar,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "config_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social-animals" (
	"id" integer PRIMARY KEY NOT NULL,
	"scientific_name" varchar,
	"title" varchar,
	"appearance" varchar,
	"json" jsonb,
	"createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "social-animals_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idxConfigKey" ON "config" ("key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idxSocialAnimalName" ON "social-animals" ("id","title");