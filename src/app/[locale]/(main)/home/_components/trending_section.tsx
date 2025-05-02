import { db } from "@/server/db";
import { desc, isNotNull, isNull } from "drizzle-orm";
import Trending from "./trending";
import { movies } from "@/server/db/schema";

export default async function TrendingSection() {
    const [trendingMovies, trendingSeries] = await Promise.all([
        db.select().from(movies).where(isNull(movies.serieId)).orderBy(desc(movies.createdAt)).limit(24),
        db.select().from(movies).where(isNotNull(movies.serieId)).orderBy(desc(movies.createdAt)).limit(24),
    ]);
    return <Trending movies={trendingMovies} series={trendingSeries} />;
}
