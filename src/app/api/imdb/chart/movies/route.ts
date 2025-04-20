import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // Mock data - replace with actual database query for movies
  const mockMovies = [
    { title: 'Movie 1', imdbRating: 8.5 },
    { title: 'Movie 2', imdbRating: 7.8 },
    // More mock movie data...
  ];

  // Implement pagination logic here with actual database query
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedMovies = mockMovies.slice(startIndex, endIndex);

  return NextResponse.json(paginatedMovies);
}