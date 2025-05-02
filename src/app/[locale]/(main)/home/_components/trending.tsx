"use client";
import { useState, type FC } from "react";
import MovieCard from "@/components/movie-card";
import SerieCard from "@/components/series/serie-card";
import { TypographyH3 } from "@/components/ui/typography";
import { type DB_SerieType, type DB_MovieType } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TrendingMovies: FC<{ movies: DB_MovieType[] }> = ({ movies }) => {
    return <div className="grid grid-cols-6 gap-4">
        {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />
        })}
    </div>;
}

export const TrendingSeries: FC<{ series: DB_SerieType[] }> = ({ series }) => {
    return <div className="grid grid-cols-6 gap-4">
        {series.map((serie) => {
            return <SerieCard key={serie.id} serie={serie} />
        })}
    </div>;
}

export default function Trending({ movies, series }: { movies: DB_MovieType[]; series: DB_SerieType[]; }) {

    return <>
        <TypographyH3>Trending</TypographyH3>
        <Tabs defaultValue="movies">
            <TabsList className="mb-4">
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="series">Series</TabsTrigger>
            </TabsList>
            <TabsContent value="movies"> <TrendingMovies movies={movies} /></TabsContent>
            <TabsContent value="series"><TrendingSeries series={series} /></TabsContent>
        </Tabs>
    </>
}