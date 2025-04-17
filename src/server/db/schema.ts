import { relations, sql } from "drizzle-orm";
import { index, pgTableCreator, primaryKey } from "drizzle-orm/pg-core";
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
  name: d.varchar("name", { length: 255 }).notNull(),
  description: d.varchar("description", { length: 500 }),
  createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

export const movies = createTable("movie", (d) => ({
  id: d.varchar({ length: 255 })
  .notNull()
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID()),
  title: d.varchar({ length: 256 }).notNull(),
  description: d.text(),
  slug: d.varchar({ length: 256 }).notNull().unique(),
  genre: d.varchar({ length: 100 }),
  country: d.varchar({ length: 100 }),
  imdbRating: d.numeric().$type<number>(),
  duration: d.integer(),
  releaseDate: d.timestamp({ mode: "date", withTimezone: true }),
  cast: d.text(),
  productionCompany: d.varchar({ length: 256 }),
  serieId: d.varchar({length: 255}).references(() => series.id, { onDelete: "cascade" }),
  createdAt: d
    .timestamp({ withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}), (t) => ([
  index("movie_title_idx").on(t.title),
  index("movie_slug_idx").on(t.slug),
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
  (t) => [index("t_user_id_idx").on(t.userId)],
);

export type DB_SerieType = typeof series.$inferSelect;
export type DB_MovieType = typeof movies.$inferSelect;
export type DB_AccountType = typeof accounts.$inferSelect;
export type DB_UserType = typeof users.$inferSelect;

export const verificationTokens = createTable(
  "verification_token",
  (d) => ({
    identifier: d.varchar({ length: 255 }).notNull(),
    token: d.varchar({ length: 255 }).notNull(),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const moviesRelations = relations(movies, ({ one }) => ({
  serie: one(series, { fields: [movies.serieId], references: [series.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const seriesRelations = relations(series, ({ many }) => ({
  movies: many(movies),
}));