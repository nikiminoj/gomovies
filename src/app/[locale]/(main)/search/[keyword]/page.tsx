import { db } from "@/server/db";
import { movies } from "@/server/db/schema";
import MovieCard from "@/components/MovieCard";
import { ilike, eq } from "drizzle-orm";
interface Props {
  params: { keyword: string };
}

interface SearchResult {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  genre: string | null;
  country: string | null;
  imdbRating: number | null;
  duration: number | null;
  releaseDate: Date | null;
  cast: string | null;
  productionCompany: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

async function searchMovies(searchKeyword: string) {
  const res = await db
    .select({
      id: movies.id,
      title: movies.title,
      description: movies.description,
      // slug: movies.slug,
      genre: movies.genre,
      country: movies.country,
      imdbRating: movies.imdbRating,
      duration: movies.duration,
      releaseDate: movies.releaseDate,
      cast: movies.cast,
      productionCompany: movies.productionCompany,
      createdAt: movies.createdAt,
      updatedAt: movies.updatedAt,
    })
    .from(movies)
    .where(ilike(movies.title, `%${searchKeyword}%`))
    .limit(50)
    .offset(0);
    return res.map(movie => ({
      ...movie,
      releaseDate: movie.releaseDate ? new Date(movie.releaseDate).toISOString().split('T')[0] : null,
      createdAt: new Date(movie.createdAt).toISOString(),
      updatedAt: movie.updatedAt ? new Date(movie.updatedAt).toISOString() : null
    }));
}
export default async function SearchResultsPage({ params }: Props) {
  const { keyword } = params;
  const searchResults = await searchMovies(keyword);

  return (
    <div>
      <h1>Search results for: {keyword}</h1>
      {searchResults.length === 0 ? (
        <p>No movies found for this keyword.</p>
      ) : (
        searchResults.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  );
}
