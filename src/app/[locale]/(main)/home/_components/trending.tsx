"use client";
import { useState } from "react";
import MovieCard from "@/components/movie-card";
import SerieCard from "@/components/series/serie-card";
import { TypographyH3 } from "@/components/ui/typography";
import { type DB_SerieType, type DB_MovieType, movies } from "@/server/db/schema";

export const TrendingMovies = ({ movies }: { movies: DB_SerieType[] }) => {
    return <>
        {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />
        })}
    </>;
}

export const TrendingSeries = ({ series }: { series: DB_SerieType[] }) => {
    return <>
        {series.map((serie) => {
            return <SerieCard key={serie.id} serie={serie} />
        })}
    </>;
}

export default function Trending({ movies, series }: { movies: DB_MovieType[], series: DB_SerieType[] }) {
    const [section, setSection] = useState<'movies' | 'series'>('movies');

    return <>
        <div className="flex flex-row items-center gap-4">
            <TypographyH3>Trending</TypographyH3>
            <div className="flex flex-row items-center gap-2">
                <div onClick={() => setSection('movies')}>Movies</div>
                <div onClick={() => setSection('series')}>Series</div>
            </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
            {section === "movies" ? <TrendingMovies movies={movies} /> : <TrendingSeries series={series} />}
        </div>
    </>
}