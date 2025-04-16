import { useState } from "react";

// Dummy movie data (replace with actual API calls)
const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster: "/shawshank.jpg", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "The Godfather",
    poster: "/godfather.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "/darkknight.jpg",
  },
  // Add more movies...
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">My Movie App</h1>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 p-2 rounded bg-gray-700 text-white w-full"
        />
      </header>

      <main className="container mx-auto p-4">
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        ) : (
          <MovieList movies={filteredMovies} onSelectMovie={setSelectedMovie} />
        )}
      </main>
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={() => onSelectMovie(movie)} />
      ))}
    </div>
  );
}

function MovieCard({ movie, onSelect }) {
  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onSelect}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
        // onError={(e) => (e.target.src = "/placeholder.jpg")} //Optional placeholder
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
      </div>
    </div>
  );
}

function MovieDetails({ movie, onClose }) {
  // In a real app, fetch movie details from an API here
  const details = {
    description: "A detailed description of the movie goes here.",
    rating: 9.3,
    // Add more details...
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <button onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
      <div className="mt-4">
        <p>{details.description}</p>
        <p className="mt-2">Rating: {details.rating}</p>
        {/* Display other details here */}
      </div>

        </div>
  );
}
