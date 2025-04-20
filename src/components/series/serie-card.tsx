import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DB_SerieType } from "@/server/db/schema";

interface SerieCardProps {
  serie: DB_SerieType
}

const MovieCard: React.FC<SerieCardProps> = ({ serie }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{serie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Release Date: {serie.releaseDate?.toString()}</CardDescription>
        {serie.description && <p>{serie.description.substring(0, 100)}...</p>}
      </CardContent>
    </Card>
  );
};

export default MovieCard;