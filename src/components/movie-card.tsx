import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { DB_MovieType } from "@/server/db/schema";
import { TypographyP } from "./ui/typography";

interface MovieCardProps {
  movie: DB_MovieType
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/watch-movie/${movie.id}`}>
      <div className="overflow-clip p-4">
        <div className="border rounded-lg h-56"></div>
        <div className="">
          <div className="font-medium text-nowrap text-ellipsis overflow-hidden">{movie.title}</div>
          <div className="grid grid-cols-3">
            <div>{movie.releaseDate?.getFullYear()}</div>
            <div></div>
            <div className="border text-center text-sm rounded text-neutral-500">{movie.serieId == null ? "Movie" : "Serie"}</div>
          </div>
        </div>
      </div>
    </Link >
  );
};

export default MovieCard;