import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DB_MovieType } from "@/server/db/schema";

interface MovieCardProps {
  movie: DB_MovieType
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Release Date: {movie.releaseDate?.toString()}</CardDescription>
        {movie.description && <p>{movie.description.substring(0, 100)}...</p>}
      </CardContent>
    </Card>
  );
};

export default MovieCard;