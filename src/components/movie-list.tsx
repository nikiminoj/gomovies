import type { DB_MovieType } from "@/server/db/schema";
import MovieCard from "./movie-card";

interface MovieListProps {
  onSelectMovie: (id: DB_MovieType) => void;
  movies: DB_MovieType[]
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div onClick={() => onSelectMovie(movie)}>
          <MovieCard key={movie.id} movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;