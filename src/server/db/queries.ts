import "server-only";
import { db } from "./index";
import { movies, series, users, userRatings } from "./schema";
import { eq, isNull, count, isNotNull, asc, desc, and } from "drizzle-orm";
import type { User } from "next-auth";


export const QUERIES = {
    getMoviesCount: async function () {
        return await db
            .select({ count: count() })
            .from(movies)
            .where(isNull(movies.serieId));
    },

    getSeriesCount: async function () {
        return await db
            .select({ count: count() })
            .from(movies)
            .where(isNotNull(movies.serieId));
    },

    getMoviesWithSeries: async function ({ limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}) {
        return await db.query.movies.findMany({
            limit,
            offset,
            with: {
                serie: true,
            },
            orderBy: [asc(movies.title)],
        });
    },

    getMovies: async function ({ limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}) {
        return await db.select()
            .from(movies)
            .where(isNull(movies.serieId))
            .limit(limit)
            .offset(offset)
            .orderBy(desc(movies.createdAt));
    },

    getSeries: async function ({ limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}) {
        return await db.query.series.findMany({
            limit,
            offset,
            with: {
                movies: true
            },
            orderBy: [desc(series.createdAt)],
        });
    },

};

export const MUTATIONS = {
    updateUserEmail: async function (data: { email: string, user: User }) {
        const userToUpdate = await db.query.users.findFirst({
            where: eq(users.id, data.user.id!)
        });
        //console.log("userToUpdate: ", userToUpdate)
        if (userToUpdate) {
            const updatedUser = await db
                .update(users)
                .set({
                    email: data.email
                })
                .where(eq(users.id, data.user.id!))
                .returning();
            console.log("updatedUser: ", updatedUser)
            return updatedUser[0] as User
        }
    },
    rateItem: async function ({ user_id, item_id, type, rating }: { user_id: string, item_id: string, type: "movie" | "serie", rating: number }) {
        const existingRating = await db.query.userRatings.findFirst({
            where: and(
                eq(userRatings.userId, user_id),
                eq(userRatings.itemId, item_id),
                eq(userRatings.type, type)
            )
        });

        if (existingRating) {
            const updatedRating = await db
                .update(userRatings)
                .set({ rating, updatedAt: new Date() })
                .where(eq(userRatings.id, existingRating.id))
                .returning();
            return updatedRating[0];
        } else {
            const newRating = await db
                .insert(userRatings)
                .values({ userId: user_id, itemId: item_id, type, rating })
                .returning();

            return newRating[0];
        }
    }
}