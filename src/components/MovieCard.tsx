import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  description?: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Release Date: {movie.releaseDate}</CardDescription>
        {movie.description && <p>{movie.description.substring(0, 100)}...</p>}
      </CardContent>
    </Card>
  );
};

export default MovieCard;