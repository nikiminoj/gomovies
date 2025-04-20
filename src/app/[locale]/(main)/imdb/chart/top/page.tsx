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
import { movies } from "@/server/db/schema";
import { notFound } from "next/navigation";
import MovieList from "@/components/movie-list";

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

  if (contentType === "movie") {
    const data = await db.select().from(movies).limit(limit);
    return <MovieList data={data} />;
  } else if (contentType === "series") {
    const data = await db.select().from(movies).limit(limit);
    return <MovieList data={data} />;
  } else {
    const data = await db.select().from(movies).limit(limit);
    return <MovieList data={data} />;
  };
};

export default TopRatedMoviesPage;