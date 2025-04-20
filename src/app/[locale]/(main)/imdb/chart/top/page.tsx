import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/server/db/index";
import { cn } from "@/lib/utils";
import { movies, type DB_MovieType } from "@/server/db/schema";
import { notFound } from "next/navigation";
import MovieList from "@/components/movie-list";
import SerieList from "@/components/series/serie-list";

interface SearchParams {
  contentType?: "all" | "movie" | "series";
  page?: string;
  limit?: string;
}

const TopRatedMoviesPage: React.FC<{ searchParams: SearchParams }> = async ({
  searchParams,
}) => {
  const contentType = searchParams.contentType || "all";
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 10;
  const onClickMovie = (movie: DB_MovieType) => { };
  const onClickSerie = (movie: DB_MovieType) => { };

  if (contentType === "movie") {
    const data = await db.select().from(movies).limit(limit);
    return <MovieList movies={data} onSelectMovie={(movie) => { }} />;
  } else if (contentType === "series") {
    const data = await db.select().from(movies).limit(limit);
    return <SerieList data={data} onSelectSerie={(serie) => { }} />;
  } else {
    const data = await db.select().from(movies).limit(limit);
    return <MovieList movies={data} onSelectMovie={(movie) => { }} />;
  };
};

export default TopRatedMoviesPage;