import { relations, sql } from "drizzle-orm";
import { index, pgEnum, pgTableCreator, primaryKey, integer, serial } from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `gomovies_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    name: d.varchar({ length: 256 }),
    createdById: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ],
);

export const series = createTable("serie", (d) => ({
  id: d
  .varchar({ length: 255 })
  .notNull()
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID()),
  title: d.varchar({ length: 255 }).notNull(),
  description: d.varchar({ length: 500 }),
  releaseDate: d.timestamp({ mode: "date", withTimezone: true }),
  createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}), (t) => ([
  index("serie_title_idx").on(t.title),
  index("serie_release_date_idx").on(t.releaseDate),
]));

export const movies = createTable("movie", (d) => ({
  id: d.varchar({ length: 255 })
  .notNull()
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID()),
  title: d.varchar({ length: 256 }).notNull(),
  description: d.text(),
  quality: d.varchar({ length: 256 }),
  slug: d.varchar({ length: 256 }).notNull().unique(),
  genre: d.varchar({ length: 100 }),
  country: d.varchar({ length: 100 }),
  imdbRating: d.numeric().$type<number>(),
  duration: d.integer(),
  releaseDate: d.timestamp({ mode: "date", withTimezone: true }),
  platformReleaseDate: d.timestamp({ mode: "date", withTimezone: true }),
  cast: d.text(),
  productionCompany: d.varchar({ length: 256 }),
  season: d.varchar({length: 255}),
  episode: d.numeric().$type<number>(),
  serieId: d.varchar({length: 255}).references(() => series.id, { onDelete: "cascade" }),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}), (t) => ([
  index("movie_title_idx").on(t.title),
  index("movie_slug_idx").on(t.slug),
  index("movie_imdb_rating_idx").on(t.imdbRating),
  index("movie_release_date_idx").on(t.releaseDate),
  index("movie_platform_release_date_idx").on(t.platformReleaseDate),
  index("movie_genre_idx").on(t.genre),
]));


export const users = createTable("user", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.varchar({ length: 255 }),
  role: d.varchar({length: 250}),
  email: d.varchar({ length: 255 }).notNull(),
  emailVerified: d
    .timestamp({
      mode: "date",
      withTimezone: true,
    })
    .default(sql`CURRENT_TIMESTAMP`),
  image: d.varchar({ length: 255 }),
}));

export const accounts = createTable(
  "account",
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.varchar({ length: 255 }).notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.varchar({ length: 255 }),
    scope: d.varchar({ length: 255 }),
    id_token: d.text(),
    session_state: d.varchar({ length: 255 }),
  }),
  (t) => [
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
    index("account_user_id_idx").on(t.userId),
  ],
);

export const sessions = createTable(
  "session",
  (d) => ({
    sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [index("session_user_id_idx").on(t.userId)],
);

export const notifications = createTable(
  "notification",
  (t) => ({
    id: t.varchar({ length: 255 }).notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
    recipientType: t.varchar({ length: 255 }).notNull(),
    recipientId: t
      .varchar({ length: 255 })
      .notNull(),
    type: t.varchar({ length: 255 }).notNull(),
    params: t.json(),
    readAt: t.timestamp({ withTimezone: true }),
    createdAt: t
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: t.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("notifications_read_at_idx").on(t.readAt),
    index("notifications_recipient_idx").on(t.recipientType, t.recipientId),
  ],
);

export const verificationTokens = createTable(
  "verification_token",
  (d) => ({
    identifier: d.varchar({ length: 255 }).notNull(),
    token: d.varchar({ length: 255 }).notNull(),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const itemTypeEnum = pgEnum('item_type', ['movie', 'serie']);

export const userRatings = createTable(
  'user_rating',
  (d) => ({
    id: d.varchar({ length: 255 }).notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: d
      .varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    itemId: d.varchar('item_id', { length: 255 }).notNull(),
    type: itemTypeEnum('type').notNull(),
    rating: integer('rating').notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull().$onUpdate(() => new Date()),
  }),
  (t) => [
    index("user_ratings_user_id_idx").on(t.userId),
    index("user_ratings_item_id_idx").on(t.itemId),
  ],
);

export type DB_NotificationType = typeof notifications.$inferSelect;
export type DB_SerieType = typeof series.$inferSelect;
export type DB_MovieType = typeof movies.$inferSelect;
export type DB_AccountType = typeof accounts.$inferSelect;
export type DB_UserType = typeof users.$inferSelect;
export type DB_SessionType = typeof sessions.$inferSelect;
export type DB_VerificationTokenType = typeof verificationTokens.$inferSelect;
export type DB_UserRatingType = typeof userRatings.$inferSelect;

export const moviesRelations = relations(movies, ({ one }) => ({
  serie: one(series, { fields: [movies.serieId], references: [series.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  ratings: many(userRatings),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const seriesRelations = relations(series, ({ many }) => ({
  movies: many(movies),
}));

export const userRatingsRelations = relations(userRatings, ({ one }) => ({
  user: one(users, { fields: [userRatings.userId], references: [users.id] }),
}));