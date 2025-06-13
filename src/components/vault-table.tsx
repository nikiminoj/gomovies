import { Avatar } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { QUERIES } from "@/server/db/queries"
import { MoreHorizontal } from "lucide-react"

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
                                <div>
                                    <div className="font-medium">{movie.title}</div>
                                    <div className="text-xs text-muted-foreground">{movie.title}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-green-500">{movie.title}</TableCell>
                        <TableCell>{movie.title}</TableCell>
                        <TableCell>{movie.title}</TableCell>
                        <TableCell>
                            <span
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${movie.title === "Fixed" ? "bg-yellow-500/10 text-yellow-500" : "bg-green-500/10 text-green-500"
                                    }`}
                            >
                                {movie.title}
                            </span>
                        </TableCell>
                        <TableCell>{movie.title}</TableCell>
                        <TableCell>
                            <div className="flex gap-1">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 w-3 rounded-full ${i < (movie.title === "high" ? 3 : movie.title === "medium" ? 2 : 1)
                                                ? "bg-primary"
                                                : "bg-muted"
                                            }`}
                                    />
                                ))}
                            </div>
                        </TableCell>
                        <TableCell>
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
