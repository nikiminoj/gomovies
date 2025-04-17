import "server-only";
import { db } from "./index";
import { movies, series } from "./schema";
import { eq, isNull, count, isNotNull, asc, desc } from "drizzle-orm";


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