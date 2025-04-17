import { Avatar } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { QUERIES } from "@/server/db/queries"
import { MoreHorizontal } from "lucide-react"

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



export async function MovieTable() {
    const movies = await QUERIES.getMoviesWithSeries();
    return (
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
                {movies.map((movie) => (
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
