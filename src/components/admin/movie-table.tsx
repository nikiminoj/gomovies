"use client"

import { Avatar } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { useQuery } from "@tanstack/react-query";
import { type DB_MovieType } from "@/server/db/schema";

const getRatingColor = (imdbRating: number | null) => {
    const rating = imdbRating ? Math.round(imdbRating * 10) : 0;
      const scaledRating = Math.min(Math.max(rating, 0), 10);
      const ratingColors: Record<number, string> = {
        0: "text-red-500",
        1: "text-red-500",
        2: "text-red-400",
        3: "text-red-400",
        4: "text-red-300",
        5: "text-red-300",
        6: "text-green-300",
        7: "text-green-300",
        8: "text-green-400",
        9: "text-green-400",
        10: "text-green-500",
      };
      return ratingColors[scaledRating];
};

const fetchMovies = async () => {
    const response = await fetch('/api/admin/movies');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


export function MovieTable() {
    const { isLoading, error, data: movies } = useQuery<{ movies: DB_MovieType[] }, Error>({ queryKey: ['movies'], queryFn: fetchMovies });;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return movies && (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>IMDB Rating</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {movies?.map((movie) => (
                    <TableRow key={movie.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <img src={`/placeholder.svg?height=24&width=24`} alt={movie.title} />
                                </Avatar>
                            </div>
                        </TableCell>
                        <TableCell className="text-green-500">{movie.title}</TableCell>
                        <TableCell>{movie.serieId ? "Episodes" : "Movie"}</TableCell>
                        <TableCell className={getRatingColor(movie.imdbRating)}>{movie.imdbRating}</TableCell>
                        <TableCell>{movie.duration}</TableCell>
                        <TableCell>{movie.genre}</TableCell>
                        <TableCell>{movie.country}</TableCell>
                        <TableCell>
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
