import MovieCard from "./movie-card";

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={() => onSelectMovie(movie)} />
      ))}
    </div>
  );
}

