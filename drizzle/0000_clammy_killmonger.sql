CREATE TABLE "gomovies_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "gomovies_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "gomovies_movie" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"slug" varchar(256) NOT NULL,
	"genre" varchar(100),
	"country" varchar(100),
	"imdbRating" numeric,
	"duration" integer,
	"releaseDate" timestamp with time zone,
	"cast" text,
	"productionCompany" varchar(256),
	"serieId" varchar(255),
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "gomovies_movie_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "gomovies_post" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"createdById" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "gomovies_serie" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "gomovies_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gomovies_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"role" varchar(250),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "gomovies_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "gomovies_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "gomovies_account" ADD CONSTRAINT "gomovies_account_userId_gomovies_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gomovies_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gomovies_movie" ADD CONSTRAINT "gomovies_movie_serieId_gomovies_serie_id_fk" FOREIGN KEY ("serieId") REFERENCES "public"."gomovies_serie"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gomovies_post" ADD CONSTRAINT "gomovies_post_createdById_gomovies_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."gomovies_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gomovies_session" ADD CONSTRAINT "gomovies_session_userId_gomovies_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gomovies_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "gomovies_account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "movie_title_idx" ON "gomovies_movie" USING btree ("title");--> statement-breakpoint
CREATE INDEX "movie_slug_idx" ON "gomovies_movie" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "movie_genre_idx" ON "gomovies_movie" USING btree ("genre");--> statement-breakpoint
CREATE INDEX "created_by_idx" ON "gomovies_post" USING btree ("createdById");--> statement-breakpoint
CREATE INDEX "name_idx" ON "gomovies_post" USING btree ("name");--> statement-breakpoint
CREATE INDEX "t_user_id_idx" ON "gomovies_session" USING btree ("userId");