"use client";

import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { type DB_MovieType } from "@/server/db/schema"; 
import MovieCard from "@/components/movie-card"; 
import { Pagination } from "@/components/ui/pagination"; 

const ITEMS_PER_PAGE = 10; // Adjust as needed

const getMovies = () => {
  axios.fetch
}

export default function MoviePage() {
  const [movies, setMovies] = useState<DB_MovieType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { movies: fetchedMovies, total } = await getMovies({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          sortBy: "release_date",
          sortOrder: "desc",
        });
        setMovies(fetchedMovies);
        setTotalItems(total);
      } catch (error) {
        console.error("Error fetching movies:", error);
        // Handle error appropriately, e.g., display an error message
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="container mx-auto mt-10 max-w-6xl p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Movies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / ITEMS_PER_PAGE)}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}