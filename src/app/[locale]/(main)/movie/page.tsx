"use client";

import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MovieCard from "@/components/movie-card";
import { Pagination } from "@/components/ui/pagination";
import type { DB_MovieType } from "@/server/db/schema";
import { TypographyH1 } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons } from "@/components/icons";
import { Filter } from "@/components/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 24;

interface MovieData {
  movies: DB_MovieType[];
  count: number;
}

const fetchMovies = async (page: number, limit: number) => {
  const res = await fetch(`/api/movies?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  const response = (await res.json()) as MovieData;

  return {
    movies: response.movies.map((movie) => response.movies.map((movie) => ({
      ...movie,
      releaseDate: movie.releaseDate ? new Date(movie.releaseDate) : null,
    }))), count: response.count
  }
};

export default function MoviePage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0
  const router = useRouter();

  const {
    data: moviesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => fetchMovies(page, ITEMS_PER_PAGE),
    // keepPreviousData: true,
  });

  const allMovies = moviesData?.movies ?? [];
  const moviesCount = moviesData?.count ?? 0;

  console.log(allMovies);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {(error as Error).message ?? "Something went wrong"}</div>
        ) : (
          <>
            <div className="container mx-auto">
              <Accordion type="single" collapsible>
                <AccordionItem value="filter">
                  <AccordionTrigger>Filter
                  </AccordionTrigger>
                  <AccordionContent>
                    <Filter />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex flex-row items-center justify-between">
                <TypographyH1>Popular Movies</TypographyH1>
              </div>

            </div>
            <div className="container mx-auto mt-10 max-w-6xl p-4">
              <div>
                <div className="text-2xl font-bold">Movies</div>
              </div>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
                <Pagination
                  // currentPage={page}
                  totalPages={Math.ceil(moviesCount / ITEMS_PER_PAGE)}
                  onPageChange={handlePageChange} />
              </div>
            </div></>
        )}
      </>
    </motion.div>
  );
}
