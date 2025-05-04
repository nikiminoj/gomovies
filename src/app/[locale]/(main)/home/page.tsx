import { TypographyH3 } from "@/components/ui/typography";
import Trending from "./_components/trending_section";
import { db } from "@/server/db";
import { eq, desc, isNull, isNotNull } from 'drizzle-orm';
import { movies, series, type DB_MovieType, type DB_SerieType } from "@/server/db/schema";
import MovieCard from "@/components/movie-card";
import SerieCard from "@/components/series/serie-card";
import * as motion from "motion/react-client";

export default async function HomePage() {
    const [latestMovies, latestSeries, comingSoon] = await Promise.all([
        db.select().from(movies).where(isNull(movies.serieId)).orderBy(desc(movies.createdAt)).limit(24),
        db.select().from(movies).where(isNotNull(movies.serieId)).orderBy(desc(movies.createdAt)).limit(24),
        db.select().from(movies).orderBy(desc(movies.platformReleaseDate)).limit(24)
    ]);

    return <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="container mx-auto">
            <Trending />
            <TypographyH3>Latest Movies</TypographyH3>
            <div className="grid grid-cols-6 gap-4">
                {latestMovies.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />
                })}
            </div>
            <TypographyH3>Latest Series</TypographyH3>
            <div className="grid grid-cols-6 gap-4">
                {latestSeries.map((serie) => {
                    return <SerieCard key={serie.id} serie={serie} />
                })}
            </div>
            <TypographyH3>Coming soon</TypographyH3>
            <div className="grid grid-cols-6 gap-4">
                {comingSoon.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />
                })}
            </div>
        </div>
    </motion.div>
}