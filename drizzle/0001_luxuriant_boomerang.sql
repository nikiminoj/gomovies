CREATE TABLE "gomovies_notification" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"recipientType" varchar(255) NOT NULL,
	"recipientId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"params" json,
	"readAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "gomovies_serie" RENAME COLUMN "name" TO "title";--> statement-breakpoint
DROP INDEX "t_user_id_idx";--> statement-breakpoint
ALTER TABLE "gomovies_serie" ADD COLUMN "releaseDate" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "gomovies_serie" ADD COLUMN "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "gomovies_serie" ADD COLUMN "updatedAt" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "notifications_read_at_idx" ON "gomovies_notification" USING btree ("readAt");--> statement-breakpoint
CREATE INDEX "notifications_recipient_idx" ON "gomovies_notification" USING btree ("recipientType","recipientId");--> statement-breakpoint
CREATE INDEX "movie_imdb_rating_idx" ON "gomovies_movie" USING btree ("imdbRating");--> statement-breakpoint
CREATE INDEX "movie_release_date_idx" ON "gomovies_movie" USING btree ("releaseDate");--> statement-breakpoint
CREATE INDEX "serie_title_idx" ON "gomovies_serie" USING btree ("title");--> statement-breakpoint
CREATE INDEX "serie_release_date_idx" ON "gomovies_serie" USING btree ("releaseDate");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "gomovies_session" USING btree ("userId");